export default function lookAhead(
  match: RegExp,
  currentPosition: number,
  input: string,
  matchNext?: RegExp
): string[] {
  const bucket: string[] = [];
  while (true) {
    const nextIndex = currentPosition + bucket.length;
    const nextToken = input[nextIndex];
    if (!nextToken) {
      break;
    }
    let m: string | RegExp = match;
    if (matchNext && bucket.length) {
      m = matchNext;
    }

    if (m && !m.test(nextToken)) {
      break;
    }

    bucket.push(nextToken);
  }

  return bucket;
}
