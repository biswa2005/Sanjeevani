from __future__ import annotations
from typing import List, Union
from pydantic import BaseModel, Field, field_validator



class PredictRequest(BaseModel):
   
    symptoms: Union[List[str], str] = Field(
        ...,
        description=(
            "List of symptom names, or a comma-separated symptom string. "
            "Each symptom must match the model's training vocabulary exactly "
            "(case-insensitive, whitespace-insensitive)."
        ),
        examples=[
            ["fatigue", "sweating", "weight_loss"],
            "fatigue, sweating, weight_loss",
        ],
        max_length=10_000,   # guard against enormous string blobs
    )

    @field_validator("symptoms", mode="before")
    @classmethod
    def coerce_string_to_list(cls, v: object) -> List[str]:
        """Convert a comma-separated string to a list, then normalise."""
        if isinstance(v, str):
            v = [s for s in v.split(",") if s.strip()]
        if not isinstance(v, list):
            raise ValueError("symptoms must be a list of strings or a comma-separated string.")
        return v


class PredictionItem(BaseModel):
    """One entry in the top-predictions list."""
    disease: str = Field(..., description="Model-predicted disease name.")
    confidence: float = Field(
        ...,
        ge=0.0,
        le=1.0,
        description="Model output probability (0–1). Not a medically calibrated value.",
    )


# ---------------------------------------------------------------------------
# Response – primary /predict response
# ---------------------------------------------------------------------------

class PredictResponse(BaseModel):
    
    prediction: str = Field(..., description="Most likely model prediction.")
    confidence: float = Field(
        ...,
        ge=0.0,
        le=1.0,
        description="Model confidence for the top prediction (0–1).",
    )
    top_predictions: List[PredictionItem] = Field(
        ...,
        description="Top-5 model predictions sorted from highest to lowest confidence.",
    )


class HealthResponse(BaseModel):
    status: str = Field("healthy", description="API health status.")
    model_loaded: bool = Field(..., description="Whether the Keras model is loaded and ready.")


class RootResponse(BaseModel):
    name: str
    status: str
