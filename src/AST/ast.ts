import {ASTNode, ASTNodeType, ASTProgramNode, PrimitiveTypes, Token, TokenType} from '../../types';

export function toAST(tokens: Token[]): ASTProgramNode {
  let currentIndex = 0;

  const AST: ASTNode = { type: ASTNodeType.Program, children: [] };

  function process(currentAST: ASTNode): ASTNode | null {
    const currentToken = tokens[currentIndex];
    let assignmentNode: Token;

    switch (currentToken.type) {
      case TokenType.AssignmentOperator:
        assignmentNode = tokens[currentIndex++];

        if (assignmentNode.type !== TokenType.AssignmentOperator) {
          throw new Error('Must use = operator to assign value');
        }
        return null;
      case TokenType.LineBreak:
        currentIndex++;
        return null;
      case TokenType.Literal:
        currentIndex++;
        return { type: ASTNodeType.Literal, value: currentToken.value, referenceValue: null};
      case TokenType.String:
        currentIndex++;

        return { type: ASTNodeType.String, value: currentToken.value };
      case TokenType.Log:
        let nextNode = tokens[currentIndex++];
        const children: ASTNode[] = [];

        while (nextNode.type !== TokenType.LineBreak || !nextNode) {
          const next = process(currentAST);

          if (
            next?.type !== ASTNodeType.String &&
            next?.type !== ASTNodeType.Literal
          ) {
            throw new Error(`Illegal arguments to print ${nextNode.type}`);
          }

          if (next) {
            children.push(next);
          }

          nextNode = tokens[currentIndex];
        }
        return { type: ASTNodeType.Log, children };
      case TokenType.VariableDeclaration:
        currentIndex++;
        const field = tokens[currentIndex++];
        if (field.type != TokenType.Const && field.type != TokenType.Fit) {
          throw new Error('unclassified variable declaration');
        }
        const variableNameNode = process(currentAST);
        if (
          !variableNameNode ||
          variableNameNode.type !== ASTNodeType.Literal
        ) {
          throw new Error('Invalid variable node');
        }
        assignmentNode = tokens[currentIndex++];

        if (assignmentNode.type !== TokenType.AssignmentOperator) {
          throw new Error('Must use = operator to assign value');
        }
        const variableValueNode = process(currentAST);
        if (!variableValueNode || !('value' in variableValueNode)) {
          throw new Error('Invalid variable value');
        }

        return {
          type: ASTNodeType.Assignment,
          name: variableNameNode.value,
          field: field.type,
          children: [variableValueNode],
        };

      default:
        return null;
    }
  }

  while (currentIndex < tokens.length) {
    const next = process(AST);

    if (next) {
      AST.children.push(next);
    }
  }

  return AST;
}

/*
* export function toAST(tokens: Token[]): ASTNode {
  let currentIndex = 0;

  const children: ASTNode[] = [];

  function process(): ASTNode | null {
    const currentToken = tokens[currentIndex];
    let assignmentNode: Token;

    switch (currentToken.type) {
      case TokenType.AssignmentOperator:
        assignmentNode = tokens[currentIndex++];

        if (assignmentNode.type !== TokenType.AssignmentOperator) {
          throw new Error('Must use = operator to assign value');
        }
        return null;
      case TokenType.LineBreak:
        currentIndex++;
        return null;
      case TokenType.Literal:
        currentIndex++;
        const s = Symbol("literal")
        return { type: ASTNodeType.Literal, value: currentToken.value, id: s, referenceValue: searchScope(children, currentToken.value, s)};
      case TokenType.String:
        currentIndex++;

        return { type: ASTNodeType.String, value: currentToken.value };
      case TokenType.Log:
        let nextNode = tokens[currentIndex++];
        const children: ASTNode[] = [];

        while (nextNode.type !== TokenType.LineBreak || !nextNode) {
          const next = process();

          if (
            next?.type !== ASTNodeType.String &&
            next?.type !== ASTNodeType.Literal
          ) {
            throw new Error(`Illegal arguments to print ${nextNode.type}`);
          }

          if (next) {
            children.push(next);
          }

          nextNode = tokens[currentIndex];
        }
        return { type: ASTNodeType.Log, children };
      case TokenType.VariableDeclaration:
        currentIndex++;
        const field = tokens[currentIndex++];
        if (field.type != TokenType.Const && field.type != TokenType.Fit) {
          throw new Error('unclassified variable declaration');
        }
        const variableNameNode = process();
        if (
          !variableNameNode ||
          variableNameNode.type !== ASTNodeType.Literal
        ) {
          throw new Error('Invalid variable node');
        }
        assignmentNode = tokens[currentIndex++];

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
          field: field.type,
          value: variableValueNode,
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
* */
