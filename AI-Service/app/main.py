from __future__ import annotations
import os
# Suppress TensorFlow C++ logging warnings before importing TF
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"

import logging
import traceback
from contextlib import asynccontextmanager
from pathlib import Path
from typing import AsyncGenerator

from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse

from app.model import DiseaseModelWrapper
from app.preprocessing import SymptomPreprocessor
from app.schemas import (
    HealthResponse,
    PredictRequest,
    PredictResponse,
    RootResponse,
)
import uvicorn

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s – %(message)s",
)
logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Paths  (all relative to THIS file's parent-parent = project root)
# ---------------------------------------------------------------------------
_HERE = Path(__file__).resolve().parent          # .../app/
_ROOT = _HERE.parent                             # .../project/
_DATASET_PATH = _ROOT / "dataset.csv"
_MODEL_KERAS = _ROOT / "model" / "disease_prediction_model.keras"
_MODEL_H5    = _ROOT / "model" / "disease_prediction_model.h5"
_LABEL_ENC   = _ROOT / "model" / "label_encoder.pkl"

# ---------------------------------------------------------------------------
# Singletons initialised at startup
# ---------------------------------------------------------------------------
preprocessor = SymptomPreprocessor(dataset_path=_DATASET_PATH)
model_wrapper = DiseaseModelWrapper(
    model_keras_path=_MODEL_KERAS,
    model_h5_path=_MODEL_H5,
    label_encoder_path=_LABEL_ENC,
)


# ---------------------------------------------------------------------------
# Lifespan – runs once at startup / shutdown
# ---------------------------------------------------------------------------
@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Perform all heavy initialisation before accepting requests."""
    logger.info("=== Disease Prediction API – startup ===")

    # 1. Build symptom vocabulary
    preprocessor.load()

    # 2. Load model + label encoder; validate feature dimension
    model_wrapper.load(expected_feature_count=preprocessor.vocabulary_size)

    logger.info(
        "=== API ready. Vocabulary: %d symptoms | Classes: %d diseases ===",
        preprocessor.vocabulary_size,
        len(model_wrapper._label_encoder.classes_),
    )
    yield
    logger.info("=== Disease Prediction API – shutdown ===")


# ---------------------------------------------------------------------------
# Application
# ---------------------------------------------------------------------------
app = FastAPI(
    title="Disease Prediction API",
    description=(
        "A lightweight machine-learning API that predicts the most likely disease "
        "based on reported symptoms.\n\n"
        "**Medical disclaimer:** Predictions produced by this API are for "
        "informational purposes only and must **not** be used as a substitute for "
        "professional medical diagnosis or advice. Always consult a qualified "
        "healthcare provider."
    ),
    version="1.0.0",
    lifespan=lifespan,
)


# ---------------------------------------------------------------------------
# Error helpers
# ---------------------------------------------------------------------------
def _error(
    code: str,
    message: str,
    http_status: int,
    **extra,
) -> JSONResponse:
    body = {"error": code, "message": message, **extra}
    return JSONResponse(status_code=http_status, content=body)


# ---------------------------------------------------------------------------
# Global exception handler – never leak internals to the client
# ---------------------------------------------------------------------------
@app.exception_handler(Exception)
async def _global_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    logger.error(
        "Unhandled exception on %s %s:\n%s",
        request.method,
        request.url.path,
        traceback.format_exc(),
    )
    return _error(
        "INTERNAL_ERROR",
        "An unexpected error occurred. Please try again later.",
        status.HTTP_500_INTERNAL_SERVER_ERROR,
    )


# ---------------------------------------------------------------------------
# GET /
# ---------------------------------------------------------------------------
@app.get(
    "/",
    response_model=RootResponse,
    summary="Root",
    description="Returns the API name and running status.",
    tags=["Info"],
)
async def root() -> RootResponse:
    return RootResponse(name="Disease Prediction API", status="running")


# ---------------------------------------------------------------------------
# GET /health
# ---------------------------------------------------------------------------
@app.get(
    "/health",
    response_model=HealthResponse,
    summary="Health check",
    description="Returns the API health status and whether the model is loaded.",
    tags=["Info"],
)
async def health() -> HealthResponse:
    return HealthResponse(status="healthy", model_loaded=model_wrapper.is_loaded)


# ---------------------------------------------------------------------------
# POST /predict
# ---------------------------------------------------------------------------
@app.post(
    "/predict",
    response_model=PredictResponse,
    summary="Predict disease from symptoms",
    description=(
        "Accepts a list of symptom names (or a comma-separated string), validates "
        "them against the model's training vocabulary, and returns the most likely "
        "disease prediction along with the top-5 predictions.\n\n"
        "- Symptom matching is **exact** (case-insensitive, whitespace-normalised).\n"
        "- Unknown or unrecognised symptoms will cause the entire request to be "
        "rejected with HTTP 400 — no partial predictions are made.\n\n"
        "**Medical disclaimer:** Results are informational only and must not replace "
        "professional medical advice."
    ),
    tags=["Prediction"],
    responses={
        400: {
            "description": "Invalid or unrecognised symptoms.",
            "content": {
                "application/json": {
                    "examples": {
                        "empty_input": {
                            "summary": "Empty input",
                            "value": {
                                "error": "EMPTY_INPUT",
                                "message": "Please provide at least one symptom.",
                            },
                        },
                        "unknown_symptom": {
                            "summary": "Unknown symptom",
                            "value": {
                                "error": "UNKNOWN_SYMPTOM",
                                "message": "One or more symptoms were not recognized.",
                                "unknown_symptoms": ["xyzabc"],
                            },
                        },
                        "no_valid_symptoms": {
                            "summary": "No valid symptoms",
                            "value": {
                                "error": "NO_VALID_SYMPTOMS",
                                "message": "No recognized symptoms were provided.",
                            },
                        },
                    }
                }
            },
        },
        500: {"description": "Internal server error (model inference failed)."},
    },
)
async def predict(request: PredictRequest) -> JSONResponse:
    """
    POST /predict

    Primary format:
        {"symptoms": ["fatigue", "sweating", "weight_loss"]}

    Also accepted:
        {"symptoms": "fatigue, sweating, weight_loss"}
    """
    raw_symptoms: list[str] = request.symptoms  # already coerced to list by validator

    # ---- Validate + vectorise ------------------------------------------
    try:
        model_input, matched_symptoms = preprocessor.validate_and_vectorize(raw_symptoms)
    except ValueError as exc:
        code = getattr(exc, "error_code", "VALIDATION_ERROR")
        unknown = getattr(exc, "unknown_symptoms", None)

        if code == "EMPTY_INPUT":
            return _error(code, str(exc), status.HTTP_400_BAD_REQUEST)
        if code == "TOO_MANY_SYMPTOMS":
            return _error(code, str(exc), status.HTTP_400_BAD_REQUEST)
        if code == "NO_VALID_SYMPTOMS":
            return _error(code, str(exc), status.HTTP_400_BAD_REQUEST)
        if code == "UNKNOWN_SYMPTOM":
            return _error(
                code,
                str(exc),
                status.HTTP_400_BAD_REQUEST,
                unknown_symptoms=unknown,
            )
        # Fallback
        return _error(code, str(exc), status.HTTP_400_BAD_REQUEST)

    # ---- Run inference -------------------------------------------------
    try:
        result = model_wrapper.predict(model_input)
    except Exception as exc:
        logger.error("Model inference failed: %s", exc, exc_info=True)
        return _error(
            "INFERENCE_ERROR",
            "Model inference failed. Please try again later.",
            status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "prediction": result["prediction"],
            "confidence": round(result["confidence"], 6),
            "top_predictions": [
                {
                    "disease": p["disease"],
                    "confidence": round(p["confidence"], 6),
                }
                for p in result["top_predictions"]
            ],
        },
    )


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
