import joblib
import pandas as pd
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

# Load models
model = joblib.load(os.path.join(BASE_DIR, "models/random_forest_model.pkl"))
description_df = joblib.load(os.path.join(BASE_DIR, "models/disease_description.pkl"))
precaution_df = joblib.load(os.path.join(BASE_DIR, "models/symptom_precaution.pkl"))

# Symptom-weight mapping
df1_external = pd.DataFrame({
    'Symptom': [
        'itching', 'skin rash', 'nodal skin eruptions', 'continuous sneezing',
        'shivering', 'chills', 'joint pain', 'vomiting', 'fatigue',
        'high fever', 'cough', 'headache'
    ],
    'weight': [1, 3, 4, 4, 5, 3, 3, 5, 4, 7, 4, 3]
})

def predict_disease(symptoms: list[str]):
    """
    symptoms: list of symptom strings (max 17)
    """

    # Convert symptoms to weights
    weights = []
    for s in symptoms:
        match = df1_external[df1_external['Symptom'] == s]
        weights.append(int(match['weight'].values[0]) if not match.empty else 0)

    # Pad to 17 features
    while len(weights) < 17:
        weights.append(0)

    prediction = model.predict([weights])[0]

    # Description
    description = description_df[
        description_df['Disease'] == prediction
    ].values[0][1]

    # Precautions
    row = precaution_df[precaution_df['Disease'] == prediction].iloc[0]
    precautions = row[1:].dropna().tolist()

    return {
        "disease": prediction,
        "description": description,
        "precautions": precautions
    }
