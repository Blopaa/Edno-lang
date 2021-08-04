import {
  ASTAssignmentNode,
  ASTLiteralNode,
  ASTNode,
  ASTNodeType,
  ASTProgramNode,
  ASTValueNode,
  PrimitiveTypes
} from '../../types';
import getInstancesLocations from '../helpers/getInstancesLocations';
import dotNotationParser from '../helpers/dotNotationParser';
import getVariableDeclarationLocation from '../helpers/getVariableDeclarationLocation';
import checkSameParent from '../helpers/checkSameParent';

interface VariableLocationData {
  variableName: string;
  location: string[];
}

export default function ASTreformat(AST: ASTProgramNode) {
  let variableDeclarationCache: Array<VariableLocationData> = [];
  const instancesLocation: Array<string[]> = getInstancesLocations(
    AST.children,
  );
  let currentVariable: VariableLocationData;
  instancesLocation.map((il) => {
    const variableInstance: ASTNode = dotNotationParser(il, AST) as ASTLiteralNode<string>;
    if (variableInstance.type === ASTNodeType.Literal) {
      const variableAlredyCached = variableDeclarationCache.find(
        (v) => v.variableName === variableInstance.value,
      );
      if (!variableAlredyCached) {
        const variableExists: string[] = getVariableDeclarationLocation(
          AST.children,
          variableInstance.value,
        );
        const newVariable = {
          variableName: variableInstance.value,
          location: variableExists,
        };
        if (!variableExists) {
          throw new Error(
            `cannot find any variable called ${variableInstance.value}`,
          );
        } else {
          variableDeclarationCache.push(newVariable);
        }
        currentVariable = newVariable;
      } else {
        currentVariable = variableAlredyCached;
      }
      let variableParentLocation = [...currentVariable.location];
      variableParentLocation.pop();
      const isScopeAble = checkSameParent(variableParentLocation, il);
      if (!isScopeAble) {
        throw new Error('cannot access a variable out of the scope');
      }
        variableInstance.referenceValue =(<PrimitiveTypes>(<ASTAssignmentNode> dotNotationParser(currentVariable.location, AST)).children[0]).value
    }
  });

  return AST
}
