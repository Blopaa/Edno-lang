export enum TokenType {
  VariableDeclaration = 'VariableDeclaration',
  End = 'End',
  Function = 'Function',
  LeftParenthesis = 'LeftParenthesis',
  RightParenthesis = 'RightParenthesis',
  LeftBrace = 'LeftBrace',
  RightBrace = 'RightBrace',
  LeftBracket = 'LeftBracket',
  RightBracket = 'RightBracket',
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
  Greater = 'Greater',
  GreaterOrEqual = 'GreaterOrEqual',
  Less = 'Less',
  LessOrEqual = 'LessOrEqual',
  Asterisk = 'Asterisk',
  AsteriskEqual = 'AsteriskEqual',
  Not = 'Not',
  NotEqual = 'NotEqual',
  Plus = 'Plus',
  DoublePlus = 'DoublePlus',
  PlusEqual = 'PlusEqual',
  Minus = 'Minus',
  DoubleMinus = 'DoubleMinus',
  MinusEqual = 'MinusEqual',
  DoubleBar = 'DoubleBar',
  DoubleAmpersan = 'DoubleAmpersan',
  Dot = 'Dot',
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
  | TokenNode<TokenType.GreaterOrEqual>
  | TokenNode<TokenType.Less>
  | TokenNode<TokenType.LessOrEqual>
  | TokenNode<TokenType.Asterisk>
  | TokenNode<TokenType.AsteriskEqual>
  | TokenNode<TokenType.Not>
  | TokenNode<TokenType.NotEqual>
  | TokenNode<TokenType.Plus>
  | TokenNode<TokenType.PlusEqual>
  | TokenNode<TokenType.DoublePlus>
  | TokenNode<TokenType.DoubleMinus>
  | TokenNode<TokenType.Minus>
  | TokenNode<TokenType.MinusEqual>
  | TokenNode<TokenType.DoubleBar>
  | TokenNode<TokenType.DoubleAmpersan>
  | TokenNode<TokenType.Dot>
  | TokenNode<TokenType.LeftBracket>
  | TokenNode<TokenType.RightBracket>
  | TokenBooleanNode<TokenType.Boolean>
  | TokenNode<TokenType.Function>
  | TokenNode<TokenType.RightBrace>
  | TokenNode<TokenType.LeftBrace>
  | TokenNode<TokenType.RightParenthesis>
  | TokenNode<TokenType.LeftParenthesis>
  | TokenNode<TokenType.End>
  | TokenNode<TokenType.AssignmentOperator>
  | TokenNode<TokenType.VariableDeclaration>
  | TokenNode<TokenType.LineBreak>
  | TokenNode<TokenType.Log>
  | TokenNode<TokenType.Const>
  | TokenNode<TokenType.Fit>
  | TokenNode<TokenType.Return>
  | TokenNode<TokenType.If>
  | TokenNode<TokenType.Else>
  | TokenNode<TokenType.For>
  | TokenNode<TokenType.Greater>
  | TokenValueNode<TokenType.Literal>
  | TokenValueNode<TokenType.String>
  | TokenValueNode<TokenType.Float>
  | TokenValueNode<TokenType.Number>;

export const TokenMapper: Array<{ key: string; value: Token }> = [
  { key: '\n', value: { type: TokenType.LineBreak } },
  { key: '>', value: { type: TokenType.Greater } },
  { key: '>=', value: { type: TokenType.GreaterOrEqual } },
  { key: '<', value: { type: TokenType.Less } },
  { key: '<=', value: { type: TokenType.LessOrEqual } },
  { key: '*', value: { type: TokenType.Asterisk } },
  { key: '*=', value: { type: TokenType.AsteriskEqual } },
  { key: '!', value: { type: TokenType.Not } },
  { key: '!=', value: { type: TokenType.NotEqual } },
  { key: '+', value: { type: TokenType.Plus } },
  { key: '++', value: { type: TokenType.DoublePlus } },
  { key: '+=', value: { type: TokenType.PlusEqual } },
  { key: '-', value: { type: TokenType.Minus } },
  { key: '-=', value: { type: TokenType.MinusEqual } },
  { key: '--', value: { type: TokenType.DoubleMinus } },
  { key: '||', value: { type: TokenType.DoubleBar } },
  { key: '.', value: { type: TokenType.Dot } },
  { key: '[', value: { type: TokenType.LeftBracket } },
  { key: ']', value: { type: TokenType.RightBracket } },
  { key: 'if', value: { type: TokenType.If } },
  { key: 'else', value: { type: TokenType.Else } },
  { key: 'for', value: { type: TokenType.For } },
  { key: 'return', value: { type: TokenType.Return } },
  { key: 'dec', value: { type: TokenType.VariableDeclaration } },
  { key: 'const', value: { type: TokenType.Const } },
  { key: 'fit', value: { type: TokenType.Fit } },
  { key: '=', value: { type: TokenType.AssignmentOperator } },
  { key: 'print', value: { type: TokenType.Log } },
  { key: ';', value: { type: TokenType.End } },
  { key: 'function', value: { type: TokenType.Function } },
  { key: '(', value: { type: TokenType.LeftParenthesis } },
  { key: ')', value: { type: TokenType.RightParenthesis } },
  { key: '{', value: { type: TokenType.LeftBrace } },
  { key: '}', value: { type: TokenType.RightBrace } },
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

export interface ASTLiteralNode<K>
  extends ASTValueNode<ASTNodeType.Literal, K> {
  referenceValue: string | null;
}

export interface ASTProgramNode {
  type: ASTNodeType.Program;
  children: ASTNode[];
}

export interface ASTAssignmentNode {
  type: ASTNodeType.Assignment;
  name: string;
  field: TokenType.Const | TokenType.Fit;
  children: PrimitiveTypes[];
}

export type PrimitiveTypes =
  | ASTValueNode<ASTNodeType.String, string>
  | ASTLiteralNode<string>;

export interface ASTLogNode {
  type: ASTNodeType.Log;
  children: ASTNode[];
}

export type ASTNode =
  | PrimitiveTypes
  | ASTProgramNode
  | ASTAssignmentNode
  | ASTLogNode;
