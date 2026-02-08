import axios from "axios";
import { config } from "dotenv";

config();

const DISEASE_API_URL = process.env.DISEASE_API_URL;

async function predictDisease(symptoms) {
  const response = await axios.post(
    DISEASE_API_URL,
    { symptoms },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
}

export { predictDisease };