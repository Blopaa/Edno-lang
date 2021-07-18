import { ASTNode, ASTNodeType, Token, TokenType } from '../../types/index.';

export function toAST(tokens: Token[]): ASTNode {
  let currentIndex = 0;

  process();

  const children: ASTNode[] = [];

  function process(): ASTNode | null {
    const currentToken = tokens[currentIndex];

    switch (currentToken.type) {
      case TokenType.AssignmentOperator:
        const assignementNode = tokens[currentIndex++];

        if (assignementNode.type !== TokenType.AssignmentOperator) {
          throw new Error('Must use = operator to assign value');
        }
      case TokenType.LineBreak:
        currentIndex++;
        return null;
      case TokenType.Literal:
        currentIndex++;

        return { type: ASTNodeType.Literal, value: currentToken.value };
      case TokenType.String:
        currentIndex++;

        return { type: ASTNodeType.String, value: currentToken.value };
      case TokenType.Log:
        let nextNode = tokens[currentIndex++];
        const children: ASTNode[] = [];

        while (nextNode.type !== TokenType.LineBreak) {
          const next = process();

          if (next) {
            children.push(next);
          }

          nextNode = tokens[currentIndex];
        }
        return { type: ASTNodeType.Log, children };
      case TokenType.VariableDeclaration:
        currentIndex++;

        const variableNameNode = process();
        if (
          !variableNameNode ||
          variableNameNode.type !== ASTNodeType.Literal
        ) {
          throw new Error('Invalid variable node');
        }
        const assignmentNode = tokens[currentIndex++];

        if (assignmentNode.type !== TokenType.AssignmentOperator) {
          throw new Error('Must use = operator to assign value');
        }
        const variableValueNode = process();
        if (!variableValueNode || !('value' in variableValueNode)) {
          throw new Error('Invalid variable value');
        }

        return {
          type: ASTNodeType.Assignment,
          name: variableNameNode.value,
          value: [variableValueNode],
        };

      default:
        return null;
    }
  }

  while (currentIndex < tokens.length) {
    const next = process();

    if (next) {
      children.push(next);
    }
  }

  return { type: ASTNodeType.Program, children };
}
