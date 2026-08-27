from __future__ import annotations
import logging
import pickle
from pathlib import Path
from typing import List
import numpy as np

logger = logging.getLogger(__name__)

try:
    import tensorflow as tf  
    from tensorflow import keras
    _TF_AVAILABLE = True
except ImportError:  
    _TF_AVAILABLE = False


class DiseaseModelWrapper:
   
    TOP_N: int = 5  # number of predictions returned

    def __init__(
        self,
        model_keras_path: Path,
        model_h5_path: Path,
        label_encoder_path: Path,
    ) -> None:
        self._model_keras_path = model_keras_path
        self._model_h5_path = model_h5_path
        self._label_encoder_path = label_encoder_path

        self._model = None
        self._label_encoder = None
        self._loaded = False

    def load(self, expected_feature_count: int) -> None:
        
        if not _TF_AVAILABLE:
            raise RuntimeError(
                "TensorFlow is not installed. Install it with: pip install tensorflow"
            )

        if not self._model_keras_path.exists():
            raise FileNotFoundError(
                f"Keras model not found at: {self._model_keras_path}"
            )

        logger.info("Loading Keras model from %s", self._model_keras_path)
        try:
            self._model = keras.models.load_model(
                str(self._model_keras_path), compile=False
            )
            logger.info("Keras model loaded successfully.")
        except Exception as keras_err:
            logger.warning(
                "Failed to load .keras model (%s). Trying .h5 fallback.", keras_err
            )
            if not self._model_h5_path.exists():
                raise FileNotFoundError(
                    f".h5 fallback model not found at: {self._model_h5_path}"
                ) from keras_err
            self._model = keras.models.load_model(
                str(self._model_h5_path), compile=False
            )
            logger.info("Loaded model from .h5 fallback.")

        model_input_dim = self._model.input_shape[-1]
        if model_input_dim != expected_feature_count:
            raise RuntimeError(
                f"Input dimension mismatch: model expects {model_input_dim} features "
                f"but the dataset produces {expected_feature_count} symptoms. "
                "Ensure dataset.csv matches the dataset used during training."
            )
        logger.info(
            "Model input dimension validated: %d features.", model_input_dim
        )

        # ---- Load label encoder ----------------------------------------
        if not self._label_encoder_path.exists():
            raise FileNotFoundError(
                f"Label encoder not found at: {self._label_encoder_path}"
            )

        logger.info("Loading label encoder from %s", self._label_encoder_path)
        with self._label_encoder_path.open("rb") as fh:
            self._label_encoder = pickle.load(fh)
        logger.info(
            "Label encoder loaded: %d disease classes.", len(self._label_encoder.classes_)
        )

        self._loaded = True

    # ------------------------------------------------------------------
    # Prediction
    # ------------------------------------------------------------------

    def predict(self, model_input: np.ndarray) -> dict:
       
        self._require_loaded()

        # Run model inference
        probabilities: np.ndarray = self._model.predict(model_input, verbose=0)[0]

        # Decode top-N predictions
        top_indices = np.argsort(probabilities)[::-1][: self.TOP_N]
        top_predictions: List[dict] = []
        for idx in top_indices:
            disease_name: str = self._label_encoder.inverse_transform([idx])[0]
            top_predictions.append(
                {"disease": disease_name, "confidence": float(probabilities[idx])}
            )

        best = top_predictions[0]
        return {
            "prediction": best["disease"],
            "confidence": best["confidence"],
            "top_predictions": top_predictions,
        }

    @property
    def is_loaded(self) -> bool:
        return self._loaded

    def _require_loaded(self) -> None:
        if not self._loaded:
            raise RuntimeError(
                "DiseaseModelWrapper.load() has not been called yet."
            )
