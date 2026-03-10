import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import QuizInitialization from './components/src_components_QuizInitialization_Version2';
import QuestionDisplay from './components/src_components_QuestionDisplay_Version2';
import FinalStats from './components/src_components_FinalStats_Version3';
import './src_App_Version3.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [quizState, setQuizState] = useState({
    subject: '',
    difficulty: 'easy',
    currentQuestion: 0,
    results: [],
  });

  const handleStartQuiz = () => {
    setCurrentPage('init');
  };

  const handleInitializeQuiz = (subject, difficulty) => {
    setQuizState({
      subject,
      difficulty,
      currentQuestion: 0,
      results: [],
    });
    setCurrentPage('quiz');
  };

  const handleQuestionComplete = (result) => {
    const updatedResults = [...quizState.results, result];
    
    if (updatedResults.length >= 3) {
      setQuizState({
        ...quizState,
        results: updatedResults,
        currentQuestion: updatedResults.length
      });
      setCurrentPage('stats');
    } else {
      setQuizState({
        ...quizState,
        results: updatedResults,
        currentQuestion: updatedResults.length,
        difficulty: result.nextDifficulty
      });
      setCurrentPage('quiz');
    }
  };

  const handleReturnHome = () => {
    setCurrentPage('home');
    setQuizState({
      subject: '',
      difficulty: 'easy',
      currentQuestion: 0,
      results: [],
    });
  };

  return (
    <div className="app">
      {currentPage === 'home' && <Home onStartQuiz={handleStartQuiz} />}
      
      {currentPage === 'init' && (
        <QuizInitialization 
          onQuizStart={handleInitializeQuiz}
          onBack={handleReturnHome}
        />
      )}
      
      {currentPage === 'quiz' && (
        <QuestionDisplay 
          subject={quizState.subject}
          difficulty={quizState.difficulty}
          questionNumber={quizState.currentQuestion + 1}
          onComplete={handleQuestionComplete}
        />
      )}
      
      {currentPage === 'stats' && (
        <FinalStats 
          results={quizState.results}
          onReturnHome={handleReturnHome}
        />
      )}
    </div>
  );
}

export default App;