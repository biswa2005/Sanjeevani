import axios from "axios";
import {config} from "dotenv";

config();

const GEMINI_URL = process.env.GEMINI_URL;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function askGemini(prompt) {
  const response = await axios.post(
    `${GEMINI_URL}?key=${GEMINI_API_KEY}`,
    {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  return response.data.candidates[0].content.parts[0].text;
}

export default askGemini;