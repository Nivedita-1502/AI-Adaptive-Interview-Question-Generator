import React, { useEffect, useState } from 'react';
import { evaluationAPI } from '../services/src_services_api_Version3';
import './styles/Stats.css';

/**
 * FinalStats Component
 * Displays quiz results and statistics
 */
function FinalStats({ results, onReturnHome }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Calculate stats on mount
  useEffect(() => {
    calculateStats();
  }, [results]);

  /**
   * Calculate quiz statistics
   */
  const calculateStats = async () => {
    try {
      setLoading(true);
      const response = await evaluationAPI.calculateStats(results);
      if (response.data.success) {
        setStats(response.data.stats);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Failed to calculate statistics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="stats-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Calculating results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="stats-container">
        <div className="error-display">
          <h3>Error</h3>
          <p>{error}</p>
          <button onClick={onReturnHome} className="home-button">
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="stats-container">
      <div className="stats-card">
        <h1>Quiz Complete! 🎉</h1>

        {/* Overall Score */}
        <div className="overall-score">
          <div className="score-circle">
            <div className="score-value">{stats?.accuracy_percentage}%</div>
            <div className="score-label">Accuracy</div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="metrics-grid">
          <div className="metric-card correct">
            <h3>✓ Correct</h3>
            <p className="metric-value">{stats?.correct_answers}</p>
          </div>
          <div className="metric-card partial">
            <h3>~ Partial</h3>
            <p className="metric-value">{stats?.partial_answers}</p>
          </div>
          <div className="metric-card incorrect">
            <h3>✗ Incorrect</h3>
            <p className="metric-value">{stats?.incorrect_answers}</p>
          </div>
        </div>

        {/* Score Details */}
        <div className="score-details">
          <div className="detail-row">
            <span className="detail-label">Total Questions:</span>
            <span className="detail-value">{stats?.total_questions}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Your Score:</span>
            <span className="detail-value">{stats?.score}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Status:</span>
            <span className={`detail-value ${stats?.passed ? 'passed' : 'failed'}`}>
              {stats?.passed ? '✓ PASSED' : '✗ NEED IMPROVEMENT'}
            </span>
          </div>
        </div>

        {/* Result Message */}
        <div className="result-message">
          {stats?.accuracy_percentage >= 85 && (
            <p className="message excellent">
              🌟 Excellent! You have mastered this topic!
            </p>
          )}
          {stats?.accuracy_percentage >= 70 && stats?.accuracy_percentage < 85 && (
            <p className="message good">
              👍 Good! Keep practicing to improve further.
            </p>
          )}
          {stats?.accuracy_percentage < 70 && (
            <p className="message improve">
              📚 Keep learning! Review the concepts and try again.
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="button-group">
          <button onClick={onReturnHome} className="home-button">
            ← Return Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default FinalStats;