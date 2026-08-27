
from __future__ import annotations
import logging
from pathlib import Path
from typing import Dict, List, Tuple
import numpy as np
import pandas as pd

logger = logging.getLogger(__name__)


class SymptomPreprocessor:
   
    #: Maximum symptoms allowed per request (protects against abuse).
    MAX_SYMPTOMS_PER_REQUEST: int = 50

    def __init__(self, dataset_path: Path) -> None:
        self._dataset_path = dataset_path
        self._all_symptoms: List[str] = []
        self._symptom_to_index: Dict[str, int] = {}
        self._loaded = False

    # ------------------------------------------------------------------
    # Startup
    # ------------------------------------------------------------------

    def load(self) -> None:
        
        if not self._dataset_path.exists():
            raise FileNotFoundError(
                f"Training dataset not found at: {self._dataset_path}"
            )

        logger.info("Loading dataset from %s", self._dataset_path)
        df = pd.read_csv(self._dataset_path)

        # --- reproduce training preprocessing exactly -------------------
        symptom_cols = [col for col in df.columns if col != "Disease"]

        all_symptoms_array = (
            pd.Series(df[symptom_cols].values.flatten())
            .dropna()
            .astype(str)
            .str.strip()
            .str.lower()
            .unique()
        )

        # numpy unique preserves insertion order on pandas Series result
        self._all_symptoms = list(all_symptoms_array)
        self._symptom_to_index = {s: i for i, s in enumerate(self._all_symptoms)}
        self._loaded = True

        logger.info(
            "Symptom vocabulary built: %d unique symptoms from %d symptom columns.",
            len(self._all_symptoms),
            len(symptom_cols),
        )

    # ------------------------------------------------------------------
    # Public properties
    # ------------------------------------------------------------------

    @property
    def vocabulary_size(self) -> int:
        """Number of unique symptoms in the training vocabulary."""
        self._require_loaded()
        return len(self._all_symptoms)

    @property
    def all_symptoms(self) -> List[str]:
        """Ordered list of all symptoms (matches training feature order)."""
        self._require_loaded()
        return self._all_symptoms

    def validate_and_vectorize(
        self,
        raw_symptoms: List[str],
    ) -> Tuple[np.ndarray, List[str]]:

        self._require_loaded()

        if len(raw_symptoms) > self.MAX_SYMPTOMS_PER_REQUEST:
            err = ValueError(
                f"Too many symptoms supplied (max {self.MAX_SYMPTOMS_PER_REQUEST})."
            )
            err.error_code = "TOO_MANY_SYMPTOMS"  # type: ignore[attr-defined]
            raise err

        normalised_all = [s.strip().lower() for s in raw_symptoms if s.strip()]

        if not normalised_all:
            err = ValueError("Please provide at least one symptom.")
            err.error_code = "EMPTY_INPUT"  # type: ignore[attr-defined]
            raise err

        seen: set[str] = set()
        deduped: List[str] = []
        for s in normalised_all:
            if s not in seen:
                seen.add(s)
                deduped.append(s)

        known: List[str] = []
        unknown: List[str] = []
        for s in deduped:
            if s in self._symptom_to_index:
                known.append(s)
            else:
                unknown.append(s)

        if unknown:
            err = ValueError(
                "One or more symptoms were not recognized."
            )
            err.error_code = "UNKNOWN_SYMPTOM"  
            err.unknown_symptoms = unknown  
            raise err


        if not known:
            err = ValueError("No recognized symptoms were provided.")
            err.error_code = "NO_VALID_SYMPTOMS"  
            raise err

        # ---- 8. Build binary feature vector ----------------------------
        input_vector = np.zeros(len(self._all_symptoms), dtype=np.float32)
        for symptom in known:
            input_vector[self._symptom_to_index[symptom]] = 1.0

        model_input = np.array([input_vector], dtype=np.float32) 
        return model_input, known


    def _require_loaded(self) -> None:
        if not self._loaded:
            raise RuntimeError(
                "SymptomPreprocessor.load() has not been called yet."
            )
