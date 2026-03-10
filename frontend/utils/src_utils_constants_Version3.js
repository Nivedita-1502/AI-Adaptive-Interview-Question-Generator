/**
 * Application constants
 */

// API Configuration
export const API_TIMEOUT = 30000;
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Quiz Configuration
export const TOTAL_QUESTIONS_PER_QUIZ = 3;
export const SUPPORTED_SUBJECTS = ['dbms', 'dsa', 'os'];
export const SUPPORTED_DIFFICULTIES = ['easy', 'medium', 'hard'];

// Similarity Thresholds
export const SIMILARITY_THRESHOLD_CORRECT = 0.85;
export const SIMILARITY_THRESHOLD_PARTIAL = 0.60;

// Classification Types
export const CLASSIFICATION = {
  CORRECT: 'correct',
  PARTIAL: 'partial',
  INCORRECT: 'incorrect'
};

// Points
export const POINTS = {
  CORRECT: 1.0,
  PARTIAL: 0.5,
  INCORRECT: 0.0
};

// Status Messages
export const STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  IDLE: 'idle'
};

// Page Names
export const PAGES = {
  HOME: 'home',
  INIT: 'init',
  QUIZ: 'quiz',
  STATS: 'stats'
};

// Subject Descriptions
export const SUBJECT_DESCRIPTIONS = {
  dbms: '📊 Database Management Systems',
  dsa: '🔗 Data Structures & Algorithms',
  os: '⚙️ Operating Systems'
};

// Difficulty Icons
export const DIFFICULTY_ICONS = {
  easy: '🟢',
  medium: '🟡',
  hard: '🔴'
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  TIMEOUT: 'Request timeout. Please try again.',
  INVALID_INPUT: 'Invalid input. Please check your data.',
  QUIZ_NOT_STARTED: 'Quiz not started. Please go back and start again.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  ANSWER_EVALUATED: 'Answer evaluated successfully!',
  QUIZ_COMPLETED: 'Quiz completed successfully!',
  DATA_SAVED: 'Data saved successfully!'
};

// Min/Max Values
export const VALIDATION = {
  MIN_ANSWER_LENGTH: 10,
  MAX_ANSWER_LENGTH: 5000,
  MIN_SUBJECT_LENGTH: 1,
  MAX_SUBJECT_LENGTH: 50
};

// Local Storage Keys
export const STORAGE_KEYS = {
  QUIZ_STATE: 'quiz_state',
  USER_PREFERENCES: 'user_preferences',
  LAST_RESULTS: 'last_results'
};