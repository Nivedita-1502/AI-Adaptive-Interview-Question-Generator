/**
 * Validation utilities
 */

/**
 * Validate answer
 */
export const validateAnswer = (answer) => {
  if (!answer) return { valid: false, message: 'Answer cannot be empty' };
  if (answer.trim().length < 10) return { valid: false, message: 'Answer must be at least 10 characters' };
  if (answer.length > 5000) return { valid: false, message: 'Answer must be less than 5000 characters' };
  return { valid: true };
};

/**
 * Validate subject
 */
export const validateSubject = (subject, validSubjects) => {
  if (!subject) return { valid: false, message: 'Subject cannot be empty' };
  if (!validSubjects.includes(subject.toLowerCase())) {
    return { valid: false, message: `Invalid subject. Valid subjects: ${validSubjects.join(', ')}` };
  }
  return { valid: true };
};

/**
 * Validate difficulty
 */
export const validateDifficulty = (difficulty, validDifficulties) => {
  if (!difficulty) return { valid: false, message: 'Difficulty cannot be empty' };
  if (!validDifficulties.includes(difficulty.toLowerCase())) {
    return { valid: false, message: `Invalid difficulty. Valid difficulties: ${validDifficulties.join(', ')}` };
  }
  return { valid: true };
};

/**
 * Validate API response
 */
export const validateApiResponse = (response) => {
  if (!response) return { valid: false, message: 'No response from server' };
  if (!response.data) return { valid: false, message: 'Invalid response format' };
  if (response.status !== 200) return { valid: false, message: `Server returned status ${response.status}` };
  return { valid: true };
};

/**
 * Validate evaluation result
 */
export const validateEvaluation = (evaluation) => {
  if (!evaluation) return { valid: false, message: 'No evaluation data' };
  if (typeof evaluation.similarity_score !== 'number') {
    return { valid: false, message: 'Invalid similarity score' };
  }
  if (!evaluation.classification) {
    return { valid: false, message: 'Missing classification' };
  }
  if (typeof evaluation.points !== 'number') {
    return { valid: false, message: 'Invalid points value' };
  }
  return { valid: true };
};

/**
 * Check if value is valid JSON
 */
export const isValidJSON = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};