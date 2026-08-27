import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import dotenv from "dotenv";
import { RunnableLambda } from "@langchain/core/runnables";
import { HfInference } from "@huggingface/inference";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { pipeline } from "@xenova/transformers";

dotenv.config();

// ============================================================================
// 1. Initialize API Clients
// ============================================================================
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const geminiModel = genAI.getGenerativeModel({
  model: "gemini-3-flash-preview",
});

// Initialize Hugging Face for OPUS-MT Translation
const hf = new HfInference(process.env.HUGGINGFACEHUB_API_KEY);

// ============================================================================
// 2. Load Symptom Index from JSON
// ============================================================================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const symptomsIndexPath = path.join(__dirname, "../../symptoms_index.json");
let SYMPTOMS_INDEX = [];

try {
  if (fs.existsSync(symptomsIndexPath)) {
    SYMPTOMS_INDEX = JSON.parse(fs.readFileSync(symptomsIndexPath, "utf-8"));
    console.log(
      `✅ [INIT] Loaded ${SYMPTOMS_INDEX.length} symptoms from symptoms_index.json`,
    );
  } else {
    console.warn(
      `⚠️ [INIT] symptoms_index.json not found at ${symptomsIndexPath}. Similarity matching bypassed.`,
    );
  }
} catch (err) {
  console.error("❌ [INIT ERROR] Failed to load symptoms_index.json:", err);
}

// ============================================================================
// 3. Helper Functions
// ============================================================================
function isHindiText(text) {
  return /[\u0900-\u097F]/.test(text);
}

function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0.0;
  let normA = 0.0;
  let normB = 0.0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Xenova Embedder Pipeline (Promise Singleton)
let embedderPromise = null;

async function getEmbedding(text) {
  if (!embedderPromise) {
    console.log(
      "⏳ [MODEL LOAD] Loading Xenova embedding model into memory...",
    );
    // Store the promise of the load, not just the result
    embedderPromise = pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");

    embedderPromise.then(() => {
      console.log("✅ [MODEL LOAD] Xenova model loaded successfully.");
    });
  }

  // Await the shared promise
  const embedder = await embedderPromise;
  const output = await embedder(text, { pooling: "mean", normalize: true });
  return Array.from(output.data);
}

function findBestMatch(symptomEmbedding, threshold = 0.65) {
  let bestMatch = null;
  let maxScore = -1;

  for (const item of SYMPTOMS_INDEX) {
    const score = cosineSimilarity(symptomEmbedding, item.embedding);
    if (score > maxScore) {
      maxScore = score;
      bestMatch = item.symptom;
    }
  }
  return maxScore >= threshold ? { symptom: bestMatch, score: maxScore } : null;
}

// ============================================================================
// 4. LangChain Runnables (Pipeline Steps)
// ============================================================================

const hindiToEnglishTranslator = new RunnableLambda({
  func: async (hindiText) => {
    try {
      const response = await hf.translation({
        model: "Helsinki-NLP/opus-mt-hi-en",
        inputs: hindiText,
      });
      return (
        response.translation_text || response[0]?.translation_text || hindiText
      );
    } catch (error) {
      console.error("❌ [TRANSLATE HI->EN ERROR]:", error.message);
      return hindiText;
    }
  },
});

const symptomExtractor = new RunnableLambda({
  func: async (englishText) => {
    const prompt = `You are a medical Named Entity Recognition (NER) system. 
Extract all physiological symptoms and medical complaints from the following text.
Return ONLY a valid JSON array of strings in English (e.g., ["headache", "high fever", "vomiting"]).
If no symptoms are present, return an empty array [].

Text: "${englishText}"`;

    try {
      const response = await geminiModel.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      });
      const rawText = response.response.text();
      const cleanedText = rawText
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();
      const parsed = JSON.parse(cleanedText);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("❌ [NER EXTRACTION ERROR]:", error.message);
      return [];
    }
  },
});

const matchSymptomsToIndex = new RunnableLambda({
  func: async (extractedSymptoms) => {
    if (!extractedSymptoms || extractedSymptoms.length === 0) return [];
    try {
      const matchPromises = extractedSymptoms.map(async (symptom) => {
        const queryEmbedding = await getEmbedding(symptom);
        const match = findBestMatch(queryEmbedding);
        return match ? match.symptom : null;
      });
      const results = await Promise.all(matchPromises);
      return [...new Set(results.filter(Boolean))];
    } catch (err) {
      console.error("❌ [VECTOR MATCH ERROR]:", err.message);
      return [];
    }
  },
});

// Step 4: Call ML Model API on localhost:8000
const predictDisease = new RunnableLambda({
  func: async (matchedSymptoms) => {
    if (!matchedSymptoms || matchedSymptoms.length === 0) {
      return { predicted_disease: "Unknown", confidence: 0 };
    }

    // FIX: Convert "Yellowish Skin" -> "yellowish_skin"
    const formattedSymptoms = matchedSymptoms.map((s) =>
      s.toLowerCase().replace(/ /g, "_"),
    );

    try {
      const response = await axios.post(
        "http://localhost:8000/predict",
        {
          symptoms: formattedSymptoms, // Send the formatted ones
        },
        { timeout: 5000 },
      );

      return response.data;
    } catch (error) {
      // Improved error logging to see exact Python validation errors
      const errorMsg = error.response?.data?.message || error.message;
      console.error("❌ [ML API ERROR]:", errorMsg);
      if (error.response?.data?.unknown_symptoms) {
        console.error(
          "Unknown symptoms flagged by Python:",
          error.response.data.unknown_symptoms,
        );
      }
      return { predicted_disease: "Unavailable", error: errorMsg };
    }
  },
});

const generatePrecautionReport = new RunnableLambda({
  func: async ({ englishQuery, matchedSymptoms, mlPrediction }) => {
    // Dynamically adjust the prompt based on whether we have an ML prediction
    let diagnosticContext = "";
    if (
      mlPrediction &&
      mlPrediction.predicted_disease &&
      mlPrediction.predicted_disease !== "Unavailable"
    ) {
      diagnosticContext = `Matched diagnostic features: ${JSON.stringify(matchedSymptoms)}
ML Diagnostic Prediction: "${mlPrediction.predicted_disease}"
Instruction: Provide a brief explanation of the ML Prediction.`;
    } else {
      diagnosticContext = `No ML prediction available. 
Instruction: 1. Analyze the user's query using your own medical knowledge and suggest 2-3 basic precautions and home remedies on user's query ${englishQuery}
2. A mandatory medical disclaimer that this is an AI tool and not a replacement for a professional doctor.`;
    }

    const prompt = `You are a helpful and cautious medical assistant.
User reported symptoms/query: "${englishQuery}"
${diagnosticContext}

Please provide:
1. An empathetic acknowledgment of their concerns.
2. A brief, non-definitive explanation of the possible condition(s) based on the instruction above.
3. 3-4 actionable self-care precautions and home remedies.
4. Red flags when they must immediately see a physician.
5. A mandatory medical disclaimer that this is an AI tool and not a replacement for a professional doctor.

Format in clean, simple plain text. DO NOT use Markdown symbols like asterisks (**) or hashes (#).`;

    try {
      const result = await geminiModel.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error("❌ [GEMINI REPORT ERROR]:", error.message);
      return "Please consult a healthcare professional immediately regarding your symptoms.";
    }
  },
});

const englishToHindiTranslator = new RunnableLambda({
  func: async (englishText) => {
    try {
      const response = await hf.translation({
        model: "Helsinki-NLP/opus-mt-en-hi",
        inputs: englishText,
      });
      return (
        response.translation_text ||
        response[0]?.translation_text ||
        englishText
      );
    } catch (error) {
      console.error("❌ [TRANSLATE EN->HI ERROR]:", error.message);
      return englishText;
    }
  },
});

// Master Pipeline Function
export async function processMedicalChat(userQuery) {
  console.log(`\n======================================================`);
  console.log(`🚀 [PIPELINE START] Processing new query`);
  console.log(`📝 [INPUT] Original Query: "${userQuery}"`);
  console.log(`======================================================`);

  try {
    const isHindi = isHindiText(userQuery);
    console.log(`🔍 [STEP 1] Language Detected: ${isHindi ? "Hindi" : "English"}`);
    
    let englishText = userQuery;

    // 1. Translate Hindi to English if Devanagari is detected
    if (isHindi) {
      console.log(`⚙️  [STEP 1.5] Translating Hindi to English via OPUS-MT...`);
      englishText = await hindiToEnglishTranslator.invoke(userQuery);
      console.log(`✅ [STEP 1.5] Translated Text: "${englishText}"`);
    }

    // 2. Extract Symptoms from English Text
    console.log(`⚙️  [STEP 2] Extracting symptoms using Gemini NER...`);
    const extractedSymptoms = await symptomExtractor.invoke(englishText);
    console.log(`✅ [STEP 2] Extracted Symptoms:`, extractedSymptoms);

    // 3. Match Extracted Symptoms with trained feature vector index
    console.log(`⚙️  [STEP 3] Matching symptoms against vector database...`);
    const matchedSymptoms = await matchSymptomsToIndex.invoke(extractedSymptoms);
    console.log(`✅ [STEP 3] Matched Database Symptoms:`, matchedSymptoms);

    // 4. Query FastAPI / Flask ML Diagnostic Microservice (CONDITIONAL)
    let mlPrediction = null;
    if (matchedSymptoms.length > 0) {
      console.log(`⚙️  [STEP 4] Sending symptoms to ML Predictor API (localhost:8000)...`);
      mlPrediction = await predictDisease.invoke(matchedSymptoms);
      console.log(`✅ [STEP 4] ML Prediction Result:`, mlPrediction);
    } else {
      console.log(`⚠️  [STEP 4] No matching symptoms found in database. Skipping ML API, relying purely on Gemini intelligence.`);
    }

    // 5. Generate Medical Advice & Precautions
    console.log(`⚙️  [STEP 5] Generating medical advice report via Gemini...`);
    const englishAdvice = await generatePrecautionReport.invoke({
      englishQuery: englishText,
      matchedSymptoms,
      mlPrediction,
    });
    console.log(`✅ [STEP 5] Advice Generated (Length: ${englishAdvice.length} characters)`);

    // 6. Translate response back to Hindi if source was Hindi
    let finalResponse = englishAdvice;
    if (isHindi) {
      console.log(`⚙️  [STEP 6] Translating advice back to Hindi via OPUS-MT...`);
      finalResponse = await englishToHindiTranslator.invoke(englishAdvice);
      console.log(`✅ [STEP 6] Translation Complete (Length: ${finalResponse.length} characters)`);
    }

    console.log(`🎉 [PIPELINE SUCCESS] Process completed successfully.\n`);

    return {
      originalQuery: userQuery,
      translatedQuery: englishText,
      detectedLanguage: isHindi ? "Hindi" : "English",
      extractedSymptoms,
      matchedSymptoms,
      mlPrediction,
      englishResponse: englishAdvice,
      finalResponse,
    };
  } catch (error) {
    console.error(`🚨 [CRITICAL PIPELINE FAILURE] An unexpected error occurred:`, error);
    throw error;
  }
}
