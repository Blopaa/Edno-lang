export enum TokenType {
  VariableDeclaration = 'VariableDeclaration',
  End = 'End',
  Function = 'Function',
  OpenParenthesis = 'OpenParenthesis',
  ClosedParenthesis = 'ClosedParenthesis',
  OpenKeyParenthesis = 'OpenKeyParenthesis',
  ClosedKeyParenthesis = 'ClosedKeyParenthesis',
  AssignmentOperator = 'AssignmentOperator',
  Literal = 'Literal',
  String = 'String',
  LineBreak = 'LineBreak',
  Log = 'Log',
  True = 'True',
  False = 'False',
  Number = 'Number',
  Boolean = 'Boolean',
  Float = 'Float',
  Const = 'Const',
  Fit = 'Fit',
  Return = 'Return',
  If = 'If',
  Else = 'Else',
  For = 'For',
}

export interface TokenNode<T extends TokenType> {
  type: T;
}

export interface TokenValueNode<T extends TokenType> extends TokenNode<T> {
  value: string;
}

export interface TokenBooleanNode<T extends TokenType>
  extends TokenValueNode<T> {
  boolType: TokenNode<TokenType.False | TokenType.True>;
}

export type Token =
  | TokenBooleanNode<TokenType.Boolean>
  | TokenNode<TokenType.Function>
  | TokenNode<TokenType.ClosedKeyParenthesis>
  | TokenNode<TokenType.OpenKeyParenthesis>
  | TokenNode<TokenType.ClosedParenthesis>
  | TokenNode<TokenType.OpenParenthesis>
  | TokenNode<TokenType.End>
  | TokenNode<TokenType.AssignmentOperator>
  | TokenNode<TokenType.VariableDeclaration>
  | TokenNode<TokenType.LineBreak>
  | TokenNode<TokenType.Log>
  | TokenNode<TokenType.Const>
  | TokenNode<TokenType.Fit>
  | TokenValueNode<TokenType.Literal>
  | TokenValueNode<TokenType.String>
  | TokenValueNode<TokenType.Float>
  | TokenValueNode<TokenType.Number>;

export const TokenMapper: Array<{ key: string; value: Token }> = [
  { key: '\n', value: { type: TokenType.LineBreak } },
  { key: 'dec', value: { type: TokenType.VariableDeclaration } },
  { key: 'const', value: { type: TokenType.Const } },
  { key: 'fit', value: { type: TokenType.Fit } },
  { key: '=', value: { type: TokenType.AssignmentOperator } },
  { key: 'print', value: { type: TokenType.Log } },
  { key: ';', value: { type: TokenType.End } },
  { key: 'function', value: { type: TokenType.Function } },
  { key: '(', value: { type: TokenType.OpenParenthesis } },
  { key: ')', value: { type: TokenType.ClosedParenthesis } },
  { key: '{', value: { type: TokenType.OpenKeyParenthesis } },
  { key: '}', value: { type: TokenType.ClosedKeyParenthesis } },
  {
    key: 'true',
    value: {
      type: TokenType.Boolean,
      value: 'true',
      boolType: { type: TokenType.True },
    },
  },
  {
    key: 'false',
    value: {
      type: TokenType.Boolean,
      value: 'false',
      boolType: { type: TokenType.False },
    },
  },
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
