import { lexer } from './';

describe('lexer testing', () => {
  test('variable declaration', () => {
    const DSL: string = "dec const hello = 'hi'";
    const DSL2: string = "dec fit hello = 'hi'";
    const DSL3: string = "dec hello = 'hi'";

    function DSL3ShouldError() {
      lexer(DSL3);
    }

    expect(lexer(DSL)).toEqual([
      { type: 'VariableDeclaration' },
      { type: 'Const' },
      { type: 'Literal', value: 'hello' },
      { type: 'AssignmentOperator' },
      { type: 'String', value: 'hi' },
    ]);
    expect(lexer(DSL2)).toEqual([
      { type: 'VariableDeclaration' },
      { type: 'Fit' },
      { type: 'Literal', value: 'hello' },
      { type: 'AssignmentOperator' },
      { type: 'String', value: 'hi' },
    ]);
    expect(DSL3ShouldError).toThrowError(
      'Illegal action, variable declaration must be classified as const or fit',
    );
  });

  test('Literal', () => {
    const DSL = 'hello';

    expect(lexer(DSL)).toEqual([{ type: 'Literal', value: 'hello' }]);
  });

  test('String', () => {
    const DSL = "'hello'";
    const DSL2 = "''hello''";

    function DSL2ShouldError() {
      lexer(DSL2);
    }

    expect(lexer(DSL)).toEqual([{ type: 'String', value: 'hello' }]);
    expect(DSL2ShouldError).toThrowError(
      'Illegal structure, inspected void string',
    );
  });

  test('Function', () => {
    const DSL = 'function(x){print(x)}';

    expect(lexer(DSL)).toEqual([
      { type: 'Function' },
      { type: 'OpenParenthesis' },
      { type: 'Literal', value: 'x' },
      { type: 'ClosedParenthesis' },
      { type: 'OpenKeyParenthesis' },
      { type: 'Log' },
      { type: 'OpenParenthesis' },
      { type: 'Literal', value: 'x' },
      { type: 'ClosedParenthesis' },
      { type: 'ClosedKeyParenthesis' },
    ]);
  });

  test('Boolean', () => {
    const DSL = 'true';

    expect(lexer(DSL)).toEqual([
      { type: 'Boolean', value: 'true', boolType: { type: 'True' } },
    ]);
  });

  test('numbers', () => {
    const DSL = '1';
    const DSL2 = '90.9';
    const DSL3 = '.34';
    const DSL4 = '0hello';

    function DSL4ShouldError() {
      lexer(DSL4);
    }

    expect(lexer(DSL)).toEqual([{ type: 'Number', value: '1' }]);
    expect(lexer(DSL2)).toEqual([{ type: 'Float', value: '90.9' }]);
    expect(lexer(DSL3)).toEqual([{ type: 'Float', value: '0.34' }]);
    expect(DSL4ShouldError).toThrowError('Unknown input character: h');
  });
});
