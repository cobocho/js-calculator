import { MAX_DIGIT } from './constants.js';

const isValidDigit = (value) => String(value).length < MAX_DIGIT;

export { isValidDigit };
