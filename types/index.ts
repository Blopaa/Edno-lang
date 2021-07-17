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
