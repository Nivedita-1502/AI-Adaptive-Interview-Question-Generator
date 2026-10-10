"""
Subject-specific evaluator for OS and DSA models
"""

import logging
from models.models_answer_evaluator_Version3 import CrossEncoderAnswerEvaluator
from config_Version3 import Config

logger = logging.getLogger(__name__)

class SubjectSpecificEvaluator:
    """
    Evaluate answers using subject-specific cross-encoder models.
    """

    def __init__(self):
        self.os_evaluator = None
        self.dsa_evaluator = None
        self._initialize_evaluators()

    def _initialize_evaluators(self):
        """Initialize subject-specific evaluators"""
        try:
            # Initialize OS evaluator
            os_model_path = 'models/os_crossencoder_trained'
            self.os_evaluator = CrossEncoderAnswerEvaluator(os_model_path)
            logger.info("✅ OS cross-encoder evaluator loaded")

            # Initialize DSA evaluator
            dsa_model_path = 'models/dsa_crossencoder_trained'
            self.dsa_evaluator = CrossEncoderAnswerEvaluator(dsa_model_path)
            logger.info("✅ DSA cross-encoder evaluator loaded")

        except Exception as e:
            logger.error(f"Error initializing subject evaluators: {e}")
            # Fallback to base model if subject models fail
            self.os_evaluator = CrossEncoderAnswerEvaluator(Config.EMBEDDING_MODEL)
            self.dsa_evaluator = CrossEncoderAnswerEvaluator(Config.EMBEDDING_MODEL)

    def evaluate_answer(self, user_answer: str, ideal_answer: str, subject: str) -> dict:
        """
        Evaluate answer using subject-specific model
        """
        try:
            subject = subject.upper()

            if subject == 'OS':
                return self.os_evaluator.evaluate_answer(user_answer, ideal_answer, subject)
            elif subject == 'DSA':
                return self.dsa_evaluator.evaluate_answer(user_answer, ideal_answer, subject)
            else:
                # Fallback to base evaluator for unknown subjects
                evaluator = CrossEncoderAnswerEvaluator(Config.EMBEDDING_MODEL)
                return evaluator.evaluate_answer(user_answer, ideal_answer, subject)

        except Exception as e:
            logger.error(f"Error in subject-specific evaluation: {e}")
            # Fallback evaluation
            evaluator = CrossEncoderAnswerEvaluator(Config.EMBEDDING_MODEL)
            return evaluator.evaluate_answer(user_answer, ideal_answer, subject)
