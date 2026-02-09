import {
  detectLanguage,
  translateToEnglish,
  translateFromEnglish,
} from "../controllers/languageDetect.js";

import { isMedicalContext } from "../controllers/intentDetect.js";
import { extractSymptoms } from "../controllers/symptomExtractor.js";
import { predictDisease } from "../controllers/diseasePrediction.js";

async function processChat(userText) {
  const language = await detectLanguage(userText);

  let englishText = userText;
  if (language.toLowerCase() !== "english") {
    englishText = await translateToEnglish(userText);
  }

  const medical = await isMedicalContext(englishText);

  if (!medical) {
    return {
      reply: `👋 Hi there! Welcome to Sanjeevani🌿,
    I’m here to help you with medicines, reminders, and health support.
    Just type /ask followed by your health-related question to get started!`,
      language,
    };
  }

  const symptoms = await extractSymptoms(englishText);
  const diseaseResult = await predictDisease(symptoms);

  let reply = `
🩺 Possible Condition: ${diseaseResult.disease}
📋 Description: ${diseaseResult.description}
💊 Precaution: ${diseaseResult.precautions}
`;

  if (language.toLowerCase() !== "english") {
    reply = await translateFromEnglish(reply, language);
  }

  return { reply };
}

export default processChat;
