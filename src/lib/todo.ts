/**
 * Placeholders look like `{{TODO: ...}}`, with a note on what is missing. They
 * are allowed anywhere real content is still missing, are highlighted wherever
 * they render, and are listed by `npm run todos`.
 */
const TODO = /(\{\{TODO:[^}]*\}\})/;

export const isTodo = (value: unknown): value is string =>
  typeof value === 'string' && TODO.test(value);

export function splitTodos(text: string): { value: string; todo: boolean }[] {
  return text
    .split(TODO)
    .filter(Boolean)
    .map((value) => ({ value, todo: TODO.test(value) }));
}
