import React, { useState } from 'react';
import './styles/Question.css';

function AnswerInput({ onSubmit, loading }) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    if (answer.trim().length > 0) {
      onSubmit(answer);
    }
  };

  return (
    <div className="answer-input-section">
      <label htmlFor="answer">Your Answer:</label>
      <textarea
        id="answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer here... (minimum 10 characters)"
        className="answer-textarea"
        disabled={loading}
        minLength="10"
      />
      <div className="character-count">
        {answer.length} characters
      </div>
      <button
        onClick={handleSubmit}
        disabled={loading || answer.trim().length < 10}
        className="submit-button"
      >
        {loading ? 'Evaluating...' : 'Submit Answer'}
      </button>
    </div>
  );
}

export default AnswerInput;