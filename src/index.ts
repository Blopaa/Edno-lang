//remove this only for test lexer

import { lexer } from './lexer';

console.log(lexer(`dec hello = 'world'
  print hello`))