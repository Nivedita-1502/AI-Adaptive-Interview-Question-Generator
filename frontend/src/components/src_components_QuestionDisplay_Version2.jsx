import React, { useState, useEffect } from 'react';
import { questionAPI, evaluationAPI } from '../services/api';
import AnswerInput from './AnswerInput';
import EvaluationResult from './EvaluationResult';
import './styles/Question.css';

function QuestionDisplay({ subject, difficulty, questionNumber, onComplete }) {
  const [question, setQuestion] = useState(null);
  const [idealAnswer, setIdealAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');

  useEffect(() => {
    fetchQuestion();
  }, [subject, difficulty]);

  const fetchQuestion = async () => {
    try {
      setLoading(true);
      setError('');
      setEvaluation(null);
      setUserAnswer('');

      const response = await questionAPI.getQuestion(subject, difficulty);
      if (response.data.success) {
        setQuestion(response.data.data);
        setIdealAnswer(response.data.ideal_answer);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Failed to fetch question');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async (answer) => {
    try {
      setEvaluating(true);
      setUserAnswer(answer);

      const response = await evaluationAPI.submitAnswer(answer, idealAnswer);
      if (response.data.success) {
        setEvaluation(response.data.evaluation);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Failed to evaluate answer');
    } finally {
      setEvaluating(false);
    }
  };

  const handleNext = async () => {
    try {
      // Get next difficulty
      const diffResponse = await evaluationAPI.getNextDifficulty(
        difficulty,
        evaluation.similarity_score
      );

      const nextDifficulty = diffResponse.data.success 
        ? diffResponse.data.next_difficulty 
        : difficulty;

      onComplete({
        question: question.question,
        userAnswer,
        ...evaluation,
        nextDifficulty
      });
    } catch (err) {
      setError('Failed to proceed to next question');
    }
  };

  if (loading) {
    return (
      <div className="question-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading question...</p>
        </div>
      </div>
    );
  }

  if (error && !evaluation) {
    return (
      <div className="question-container">
        <div className="error-display">
          <h3>Error</h3>
          <p>{error}</p>
          <button onClick={fetchQuestion} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="question-container">
      <div className="question-header">
        <div className="progress">
          <span className="question-number">Question {questionNumber} of 3</span>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(questionNumber / 3) * 100}%` }}></div>
          </div>
        </div>
        <div className="difficulty-badge">
          Difficulty: <span className={`badge-${difficulty}`}>{difficulty.toUpperCase()}</span>
        </div>
      </div>

      <div className="question-card">
        <h2 className="question-text">{question?.question}</h2>

        <div className="keywords-section">
          <strong>Key Topics:</strong>
          <div className="keywords">
            {question?.keywords.split(',').map((kw, idx) => (
              <span key={idx} className="keyword">
                {kw.trim()}
              </span>
            ))}
          </div>
        </div>

        {!evaluation ? (
          <AnswerInput
            onSubmit={handleSubmitAnswer}
            loading={evaluating}
          />
        ) : (
          <>
            <EvaluationResult
              evaluation={evaluation}
              userAnswer={userAnswer}
              idealAnswer={idealAnswer}
            />
            <button onClick={handleNext} className="next-button">
              {questionNumber === 3 ? 'View Results' : 'Next Question'} →
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default QuestionDisplay;