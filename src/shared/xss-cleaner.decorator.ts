import { Transform } from 'class-transformer';
import { sanitizeXss } from './sanitize-xss';

/**
 * Decorator for sanitizing input fields from XSS attacks
 */
export function XssSanitize() {
  return Transform(sanitizeXss);
}
