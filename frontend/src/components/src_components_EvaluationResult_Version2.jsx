import React from 'react';
import './styles/Result.css';

function EvaluationResult({ evaluation, userAnswer, idealAnswer }) {
  const getClassificationIcon = (classification) => {
    switch (classification) {
      case 'correct':
        return '✓';
      case 'partial':
        return '~';
      case 'incorrect':
        return '✗';
      default:
        return '?';
    }
  };

  const getClassificationColor = (classification) => {
    switch (classification) {
      case 'correct':
        return '#10b981';
      case 'partial':
        return '#f59e0b';
      case 'incorrect':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  return (
  <div className="evaluation-result">
    
    <div className={`result-header ${evaluation.classification}`}>
      <h3>Evaluation Result</h3>
    </div>

    <div className="result-body">
      <p><strong>Score:</strong> {evaluation.score}</p>
      <p><strong>Classification:</strong> {evaluation.classification}</p>
      <p><strong>Feedback:</strong> {evaluation.feedback}</p>
    </div>

  </div>
);
}
export default EvaluationResult;