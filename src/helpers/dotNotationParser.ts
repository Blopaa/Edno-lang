import {ASTNode} from "../../types";

export default function dotNotationParser(
  location: string[],
  obj: ASTNode,
) {
  return location.reduce((o: typeof obj, i: string) => (<{[key: string]: any}>o)[i], obj);
}
