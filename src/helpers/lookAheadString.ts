
/**
 * 
 * @param str token key
 * @param currentPosition current position on lexer
 * @param input input text
 * @returns if match any tokenMapper
 */

export default function lookaheadString(
  str: string,
  currentPosition: number,
  input: string
): boolean {

  const parts = str.split('');

  for (let i = 0; i < parts.length; i++) {
    if (input[currentPosition + i] !== parts[i]) {
      return false;
    }
  }

  return true;
}
