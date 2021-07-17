//remove this only for test lexer

import { tokeniser } from './lexer/lexer';

console.log(tokeniser(`
  dec hello = 'world'
  print hello
`))