import React from 'react';
import './styles/Home.css';

function Home({ onStartQuiz }) {
  return (
    <div className="home-container">
      <div className="home-card">
        <div className="home-header">
          <h1>🤖 AI Interview Generator</h1>
          <p className="tagline">Adaptive Learning Meets Interview Prep</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🧠</span>
            <h3>AI-Powered Evaluation</h3>
            <p>Fine-tuned Sentence Transformers evaluate your answers using semantic similarity</p>
          </div>
          
          <div className="feature-card">
            <span className="feature-icon">📚</span>
            <h3>Adaptive Questions</h3>
            <p>Difficulty adapts based on your performance for optimal learning</p>
          </div>
          
          <div className="feature-card">
            <span className="feature-icon">📈</span>
            <h3>Performance Analytics</h3>
            <p>Get detailed metrics on accuracy, classifications, and learning progress</p>
          </div>
          
          <div className="feature-card">
            <span className="feature-icon">🎯</span>
            <h3>Multiple Topics</h3>
            <p>Covers DBMS, Data Structures & Algorithms, and Operating Systems</p>
          </div>
        </div>

        <div className="cta-section">
          <button onClick={onStartQuiz} className="start-button">
            Start Quiz →
          </button>
        </div>

        <div className="info-section">
          <p className="info-text">
            💡 <strong>How it works:</strong> Answer interview questions, get AI-powered feedback, and watch your difficulty level adapt in real-time!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;