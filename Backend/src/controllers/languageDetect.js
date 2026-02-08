import askGemini from "../services/gemini.js";

async function detectLanguage(text) {
  const prompt = `
Detect the language of the following text.
Reply with only the language name.

Text:
${text}
`;
  return (await askGemini(prompt)).trim();
}

async function translateToEnglish(text) {
  const prompt = `
Translate the following text to English:

${text}
`;
  return await askGemini(prompt);
}

async function translateFromEnglish(text, targetLang) {
  const prompt = `
Translate the following text to ${targetLang}:

${text}
`;
  return await askGemini(prompt);
}

export { detectLanguage, translateToEnglish, translateFromEnglish };
