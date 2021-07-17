import { Token, TokenMapper, TokenType } from '../../types';
import lookAhead from '../helpers/lookAhead';
import lookaheadString from '../helpers/lookAheadString';

export function tokeniser(input: string): Token[] {
  const out: Token[] = [];
  let currentPosition = 0;

  while (currentPosition < input.length) {
    const currentToken = input[currentPosition];
    const literalRegex = /[a-zA-Z]/;
    const literalRegexNext = /[a-zA-Z0-9]/;

    if (currentToken === ' ') {
      currentPosition++;
      continue;
    }
    let didMatch: boolean = false;

    for (const { key, value } of TokenMapper) {
      if (!lookaheadString(key, currentPosition, input)) {
        continue;
      }

      out.push(value);
      currentPosition += key.length;
      didMatch = true;
    }

    if (didMatch) {
      continue;
    }

    if (literalRegex.test(currentToken)) {
      const bucket = lookAhead(
        literalRegex,
        currentPosition,
        input,
        literalRegexNext
      );

      out.push({
        type: TokenType.Literal,
        value: bucket.join(''),
      });

      currentPosition += bucket.length;
      continue;
    }

    if (currentToken === "'") {
      currentPosition++;
      const bucket = lookAhead(/[^']/, currentPosition, input);
      out.push({
        type: TokenType.String,
        value: bucket.join(''),
      });

      currentPosition += bucket.length + 1;

      continue;
    }

    throw new Error(`Unknow input character: ${currentToken}`);
  }

  return out;
}
