//remove this only for tests

import { toAST } from './AST/ast';
import {lexer} from './lexer';

const DSL = `dec const hello = 'hi'`;

const tokens = lexer(DSL);

console.log({ tokens });

// const AST = toAST(tokens);
//
// console.log(`\n\nAst: \n\n${JSON.stringify(AST, undefined, 2)}`);
