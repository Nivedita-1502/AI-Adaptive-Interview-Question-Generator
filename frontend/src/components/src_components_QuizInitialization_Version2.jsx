import React, { useState, useEffect } from 'react';
import { questionAPI } from '../services/api';
import './styles/Quiz.css';

function QuizInitialization({ onQuizStart, onBack }) {
  const [subjects, setSubjects] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const response = await questionAPI.getSubjects();
      if (response.data.success) {
        setSubjects(response.data.subjects);
        setSelectedSubject(response.data.subjects[0] || '');
      }
    } catch (err) {
      setError('Failed to load subjects');
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectChange = async (subject) => {
    setSelectedSubject(subject);
    try {
      const response = await questionAPI.getDifficulties(subject);
      if (response.data.success) {
        setDifficulties(response.data.difficulties);
        setSelectedDifficulty(response.data.difficulties[0] || 'easy');
      }
    } catch (err) {
      setError('Failed to load difficulties');
    }
  };

  const handleStart = () => {
    if (selectedSubject && selectedDifficulty) {
      onQuizStart(selectedSubject, selectedDifficulty);
    }
  };

  if (loading) {
    return (
      <div className="quiz-init-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading subjects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-init-container">
      <div className="quiz-init-card">
        <h2>Quiz Configuration</h2>
        
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="subject">Select Subject:</label>
          <select
            id="subject"
            value={selectedSubject}
            onChange={(e) => handleSubjectChange(e.target.value)}
            className="select-input"
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>
                {subject.toUpperCase()}
              </option>
            ))}
          </select>
          <p className="subject-description">
            {selectedSubject === 'dbms' && '📊 Database Management Systems'}
            {selectedSubject === 'dsa' && '🔗 Data Structures & Algorithms'}
            {selectedSubject === 'os' && '⚙️ Operating Systems'}
          </p>
        </div>

        <div className="form-group">
          <label htmlFor="difficulty">Select Starting Difficulty:</label>
          <div className="difficulty-selector">
            {difficulties.map(diff => (
              <button
                key={diff}
                className={`difficulty-btn ${selectedDifficulty === diff ? 'active' : ''}`}
                onClick={() => setSelectedDifficulty(diff)}
              >
                {diff.charAt(0).toUpperCase() + diff.slice(1)}
                {diff === 'easy' && ' 🟢'}
                {diff === 'medium' && ' 🟡'}
                {diff === 'hard' && ' 🔴'}
              </button>
            ))}
          </div>
        </div>

        <div className="button-group">
          <button onClick={onBack} className="back-button">
            ← Back
          </button>
          <button onClick={handleStart} className="start-button">
            Start Quiz →
          </button>
        </div>

        <div className="quiz-info">
          <p>📋 You will answer <strong>3 questions</strong> with adaptive difficulty</p>
          <p>🤖 Answers evaluated using AI-powered semantic similarity</p>
        </div>
      </div>
    </div>
  );
}

export default QuizInitialization;