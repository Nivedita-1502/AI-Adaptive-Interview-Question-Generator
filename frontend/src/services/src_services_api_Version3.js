import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Axios instance for API communication
 */
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

/**
 * Question API calls
 */
export const questionAPI = {
  /**
   * Get a question
   * POST /questions/get-question
   */
  getQuestion: (subject, difficulty) =>
    api.post('/questions/get-question', { subject, difficulty }),
  
  /**
   * Get available subjects
   * GET /questions/subjects
   */
  getSubjects: () =>
    api.get('/questions/subjects'),
  
  /**
   * Get available difficulties for subject
   * GET /questions/difficulties/<subject>
   */
  getDifficulties: (subject) =>
    api.get(`/questions/difficulties/${subject}`),
  
  /**
   * Get quiz information
   * GET /questions/info
   */
  getQuizInfo: () =>
    api.get('/questions/info'),
};

/**
 * Evaluation API calls
 */
export const evaluationAPI = {
  /**
   * Submit and evaluate an answer
   * POST /evaluation/submit-answer
   */
  submitAnswer: (userAnswer, idealAnswer) =>
    api.post('/evaluation/submit-answer', { 
      user_answer: userAnswer, 
      ideal_answer: idealAnswer 
    }),
  
  /**
   * Batch evaluate multiple answers
   * POST /evaluation/batch-evaluate
   */
  batchEvaluate: (answers) =>
    api.post('/evaluation/batch-evaluate', { answers }),
  
  /**
   * Get next difficulty
   * POST /evaluation/get-next-difficulty
   */
  getNextDifficulty: (currentDifficulty, similarityScore) =>
    api.post('/evaluation/get-next-difficulty', { 
      current_difficulty: currentDifficulty, 
      similarity_score: similarityScore 
    }),
  
  /**
   * Calculate final statistics
   * POST /evaluation/calculate-stats
   */
  calculateStats: (results) =>
    api.post('/evaluation/calculate-stats', { results }),
  
  /**
   * Get model information
   * GET /evaluation/model-info
   */
  getModelInfo: () =>
    api.get('/evaluation/model-info'),
};

/**
 * Health check
 */
export const healthCheck = () =>
  api.get('/health');

export default api;