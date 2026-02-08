import askGemini from "../services/gemini.js";

async function extractSymptoms(text) {
  const prompt = `
Extract medical symptoms from the text below.
return them as a array of comma-separated string like this format : ["symptom1", "symptom2", "symptom3"]
Don't add extra things, just return it in the above format. If no symptoms found, return an empty array. 

Text:
${text}
`;
  const response = await askGemini(prompt);
  console.log("Raw symptom extraction response:", response);

  // Try to parse the model's text into a JS array of strings.
  try {
    const trimmed = String(response).trim();

    // Case: JSON object like {"symptoms": [..]} or any object containing an array
    if (trimmed.startsWith("{")) {
      const obj = JSON.parse(trimmed);
      if (Array.isArray(obj.symptoms)) return obj.symptoms;
      for (const k in obj) {
        if (Array.isArray(obj[k])) return obj[k];
      }
    }

    // Case: direct JSON array
    if (trimmed.startsWith("[")) {
      const arr = JSON.parse(trimmed);
      if (Array.isArray(arr)) return arr;
    }

    // Extract first bracketed array substring like: symptoms : ["a", "b"]
    const bracketMatch = trimmed.match(/\[.*\]/s);
    if (bracketMatch) {
      const arr = JSON.parse(bracketMatch[0]);
      if (Array.isArray(arr)) return arr;
    }

    // Extract after colon: key : [ ... ]
    const colonMatch = trimmed.match(/:\s*(\[.*\])/s);
    if (colonMatch) {
      const arr = JSON.parse(colonMatch[1]);
      if (Array.isArray(arr)) return arr;
    }
  } catch (err) {
    console.warn("Failed to parse symptom response:", err.message);
  }

  // Fallback: capture quoted strings
  const quoted = Array.from(String(response).matchAll(/"([^"\\]+)"/g)).map(
    (m) => m[1],
  );
  if (quoted.length) return quoted;

  // Final fallback: return empty array
  return [];
}

export { extractSymptoms };
