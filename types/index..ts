export enum TokenType {
  VariableDeclaration = 'VariableDeclaration',
  AssignmentOperator = 'AssignmentOperator',
  Literal = 'Literal',
  String = 'String',
  LineBreak = 'LineBreak',
  Log = 'Log',
}

export interface TokenNode<T extends TokenType> {
  type: T;
}

export interface TokenValueNode<T extends TokenType> extends TokenNode<T> {
  value: string;
}

export type Token =
  | TokenNode<TokenType.AssignmentOperator>
  | TokenNode<TokenType.VariableDeclaration>
  | TokenNode<TokenType.LineBreak>
  | TokenNode<TokenType.Log>
  | TokenValueNode<TokenType.Literal>
  | TokenValueNode<TokenType.String>;

export const TokenMapper: Array<{ key: string; value: Token }> = [
  { key: '\n', value: { type: TokenType.LineBreak } },
  { key: 'dec', value: { type: TokenType.VariableDeclaration } },
  { key: '=', value: { type: TokenType.AssignmentOperator } },
  { key: 'print', value: { type: TokenType.Log } },
];

export enum ASTNodeType {
  Program = 'Program',
  Literal = 'Literal',
  String = 'String',
  Assignment = 'Assignment',
  Log = 'Log',
}

export interface ASTValueNode<T extends ASTNodeType, K> {
  type: T;
  value: K;
}

export interface ASTProgramNode {
  type: ASTNodeType.Program;
  children: ASTNode[];
}

export interface ASTAssignmentNode {
  type: ASTNodeType.Assignment;
  name: string;
  value: ASTNode[];
}

export interface ASTLogNode {
  type: ASTNodeType.Log;
  children: ASTNode[];
}

export type ASTNode =
  | ASTValueNode<ASTNodeType.String, string>
  | ASTValueNode<ASTNodeType.Literal, string>
  | ASTProgramNode
  | ASTAssignmentNode
  | ASTLogNode;
