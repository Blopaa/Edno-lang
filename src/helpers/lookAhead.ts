/**
 * 
 * @param match first RegExp
 * @param currentPosition current position on input
 * @param input input text
 * @param matchNext second RegExp
 * @returns return match value
 */

export default function lookAhead(
  match: RegExp,
  currentPosition: number,
  input: string,
  matchNext?: RegExp
): string[] {
    // where velue its stored
  const bucket: string[] = [];
  while (true) {
      //curernt index on function
    const nextIndex = currentPosition + bucket.length;
        //current token on function
    const nextToken = input[nextIndex];
    //break if its input end
    if (!nextToken) {
      break;
    }
    // match first RegExp
    let m: string | RegExp = match;
    // case there is another RegExp change to it on second iteration
    if (matchNext && bucket.length) {
      m = matchNext;
    }
    // case nexttoken doesnt match regex break
    if (m && !m.test(nextToken)) {
      break;
    }
    //add char to array
    bucket.push(nextToken);
  }

  return bucket;
}
