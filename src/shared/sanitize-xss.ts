import { TransformFnParams } from 'class-transformer';

/**
 * Function to sanitize xss
 * @param {TransformFnParams} { value }
 */
export function sanitizeXss({ value }: TransformFnParams): string {
  if (!value || typeof value !== 'string') return value;

  value = value.replace(/<[^>]*>?/gm, '');

  value = value.replace(/on\w+="[^"]*"/gi, '');

  value = value.replace(/&/g, '&amp;');
  value = value.replace(/"/g, '&quot;');
  value = value.replace(/'/g, '&#x27;');
  value = value.replace(/</g, '&lt;');
  value = value.replace(/>/g, '&gt;');

  return value.trim();
}
