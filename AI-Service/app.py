from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from service.prediction import predict_disease

app = FastAPI(title="Disease Prediction API")

class PredictRequest(BaseModel):
    symptoms: list[str]

@app.post("/predict")
def predict(req: PredictRequest):
    if not req.symptoms:
        raise HTTPException(status_code=400, detail="Symptoms list cannot be empty")

    result = predict_disease(req.symptoms)
    return result

