import { ASTNode, ASTNodeType } from '../../types';

export default function getInstancesLocations(
  AST: ASTNode[],
  location: string[] = [],
  outIndex: number = 0,
  literalLocation: Array<string[]> = [],
) {
  if (outIndex > 0) {
    location.push('children');
  }
  AST.forEach((n, i) => {
    if (n.type === ASTNodeType.Literal) {
      location.push(i.toString());
      literalLocation.push(['children', ...location]);
      location = [];
    } else if ('children' in n) {
      let tempLocation: string[] = [...location];
      tempLocation.push(i.toString());
      getInstancesLocations(n.children, tempLocation, 1 + outIndex, literalLocation);
    }
  });

  return literalLocation;
}
