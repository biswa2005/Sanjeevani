import askGemini from "../services/gemini.js";

async function isMedicalContext(text) {
  const prompt = `
You are a strict classifier.

If the text is related to health, symptoms, disease,
reply ONLY with "YES".
Otherwise reply ONLY with "NO".

Text:
${text}
`;
  const response = await askGemini(prompt);
  return response.trim().toUpperCase() === "YES";
}

export { isMedicalContext };
