/**
 * Helper utilities for the frontend
 */

/**
 * Format accuracy as percentage
 */
export const formatAccuracy = (decimal) => {
  return `${(decimal * 100).toFixed(1)}%`;
};

/**
 * Format similarity score
 */
export const formatSimilarity = (score) => {
  return `${(score * 100).toFixed(1)}%`;
};

/**
 * Get classification color
 */
export const getClassificationColor = (classification) => {
  const colors = {
    correct: '#10b981',
    partial: '#f59e0b',
    incorrect: '#ef4444'
  };
  return colors[classification] || '#6b7280';
};

/**
 * Get classification icon
 */
export const getClassificationIcon = (classification) => {
  const icons = {
    correct: '✓',
    partial: '~',
    incorrect: '✗'
  };
  return icons[classification] || '?';
};

/**
 * Calculate average score
 */
export const calculateAverageScore = (results) => {
  if (!results || results.length === 0) return 0;
  const total = results.reduce((sum, result) => sum + (result.points || 0), 0);
  return total / results.length;
};

/**
 * Get performance message
 */
export const getPerformanceMessage = (accuracy) => {
  if (accuracy >= 0.85) return 'Excellent! You have mastered this topic!';
  if (accuracy >= 0.70) return 'Good! Keep practicing to improve further.';
  return 'Keep learning! Review the concepts and try again.';
};

/**
 * Truncate text
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Validate email
 */
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Sleep for given milliseconds
 */
export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));