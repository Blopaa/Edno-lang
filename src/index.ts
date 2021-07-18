//remove this only for tests

import { toAST } from './AST/ast';
import { tokeniser } from './lexer/lexer';

const DSL = `
dec hello = 'world'
print 'hello'
`;

const tokens = tokeniser(DSL);

console.log({ tokens });

const AST = toAST(tokens);

console.log(JSON.stringify(AST, undefined, 2));
