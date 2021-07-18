import { Token, TokenMapper, TokenType } from '../../types/index.';
import lookAhead from '../helpers/lookAhead';
import lookaheadString from '../helpers/lookAheadString';

/**
 *
 * @param input - text to read must be in ednoLang
 * @returns an array of classified tokens
 */

export function tokeniser(input: string): Token[] {
  //where classified tokens store
  const out: Token[] = [];
  //current position at input text
  let currentPosition = 0;

  while (currentPosition < input.length) {
    // char at current position in input
    const currentToken = input[currentPosition];
    // both regex to match literals
    const literalRegex = /[a-zA-Z]/;
    const literalRegexNext = /[a-zA-Z0-9]/;
    // if match with any TokenMapper default false
    let didMatch: boolean = false;

    //ignore white spaces
    if (currentToken === ' ') {
      currentPosition++;
      continue;
    }

    //map all TokenMapper and try to match with currentToken

    for (const { key, value } of TokenMapper) {
      if (!lookaheadString(key, currentPosition, input)) {
        continue;
      }

      out.push(value); // add classified token
      currentPosition += key.length; // update position after added token
      didMatch = true; // update match to continue to next iteration line 44-46
    }

    if (didMatch) {
      continue;
    }
    //check regex match with literal token
    if (literalRegex.test(currentToken)) {
      // look on input all literal to catch it all and save its value
      const bucket = lookAhead(
        literalRegex,
        currentPosition,
        input,
        literalRegexNext
      );
      //add clasified literal token
      out.push({
        type: TokenType.Literal,
        value: bucket.join(''),
      });
      // update position after literal token
      currentPosition += bucket.length;
      continue;
    }
    //catch strign types
    if (currentToken === "'") {
      currentPosition++; //ignore first '

      // catch all string value
      const bucket = lookAhead(/[^']/, currentPosition, input);
      out.push({
        type: TokenType.String,
        value: bucket.join(''),
      });
      //set curernt position adter string token
      currentPosition += bucket.length + 1;

      continue;
    }

    throw new Error(`Unknow input character: ${currentToken}`);
  }

  return out;
}
