import fs from "fs";
import { pipeline } from "@xenova/transformers";

// Full list of 132 symptoms from the master directory
const SYMPTOMS = [
  "Abdominal Pain", "Abnormal Menstruation", "Acidity", "Acute Liver Failure", "Altered Sensorium", "Anxiety",
  "Back Pain", "Belly Pain", "Blackheads", "Bladder Discomfort", "Blister", "Blood In Sputum", "Bloody Stool", 
  "Blurred And Distorted Vision", "Breathlessness", "Brittle Nails", "Bruising", "Burning Micturition",
  "Chest Pain", "Chills", "Cold Hands And Feets", "Coma", "Congestion", "Constipation", "Continuous Feel Of Urine", 
  "Continuous Sneezing", "Cough", "Cramps",
  "Dark Urine", "Dehydration", "Depression", "Diarrhoea", "Dischromic Patches", "Distention Of Abdomen", "Dizziness", "Drying And Tingling Lips",
  "Enlarged Thyroid", "Excessive Hunger", "Extra Marital Contacts",
  "Family History", "Fast Heart Rate", "Fatigue", "Fever", "Fluid Overload", "Foul Smell Of Urine",
  "Headache", "High Fever", "Hip Joint Pain", "History Of Alcohol Consumption",
  "Increased Appetite", "Indigestion", "Inflammatory Nails", "Internal Itching", "Irregular Sugar Level", "Irritability", "Irritation In Anus", "Itching",
  "Joint Pain",
  "Knee Pain",
  "Lack Of Concentration", "Lethargy", "Loss Of Appetite", "Loss Of Balance", "Loss Of Smell",
  "Malaise", "Mild Fever", "Mood Swings", "Movement Stiffness", "Mucoid Sputum", "Muscle Pain", "Muscle Wasting", "Muscle Weakness",
  "Nausea", "Neck Pain", "Nodal Skin Eruptions",
  "Obesity",
  "Pain Behind The Eyes", "Pain During Bowel Movements", "Pain In Anal Region", "Painful Walking", "Palpitations", "Passage Of Gases", "Patches In Throat", "Phlegm", "Polyuria", "Prominent Veins On Calf", "Puffy Face And Eyes", "Pus Filled Pimples",
  "Receiving Blood Transfusion", "Receiving Unsterile Injections", "Red Sore Around Nose", "Red Spots Over Body", "Redness Of Eyes", "Restlessness", "Runny Nose", "Rusty Sputum",
  "Scurring", "Shivering", "Silver Like Dusting", "Sinus Pressure", "Skin Peeling", "Skin Rash", "Slurred Speech", "Small Dents In Nails", "Spinning Movements", "Spotting Urination", "Stiff Neck", "Stomach Bleeding", "Stomach Pain", "Sunken Eyes", "Sweating", "Swelled Lymph Nodes", "Swelling Joints", "Swelling Of Stomach", "Swollen Blood Vessels", "Swollen Extremeties", "Swollen Legs",
  "Throat Irritation", "Toxic Look (Typhos)",
  "Ulcers On Tongue", "Unsteadiness",
  "Visual Disturbances", "Vomiting",
  "Watering From Eyes", "Weakness In Limbs", "Weakness Of One Body Side", "Weight Gain", "Weight Loss",
  "Yellow Crust Ooze", "Yellow Urine", "Yellowing Of Eyes", "Yellowish Skin"
];

async function generateAndSaveEmbeddings() {
  console.log("Loading embedding model (all-MiniLM-L6-v2)...");
  const embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");

  console.log(`Generating embeddings for ${SYMPTOMS.length} symptoms...`);
  const symptomData = [];

  for (const symptom of SYMPTOMS) {
    const output = await embedder(symptom, { pooling: "mean", normalize: true });
    symptomData.push({
      symptom,
      embedding: Array.from(output.data),
    });
  }

  fs.writeFileSync("symptoms_index.json", JSON.stringify(symptomData, null, 2));
  console.log("Saved embeddings to symptoms_index.json successfully!");
}

generateAndSaveEmbeddings();