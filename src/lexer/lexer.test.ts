import {expect} from 'chai';
import {Ttoken} from '../types/token';
import tokenPool from '../token/tokenPool';
import {Lexer} from './lexter';

it('토큰 테스트', () => {
    const input = '=+(){},;';
    const tokenTestCase: Ttoken[] = [
        {type: tokenPool.ASSIGN, literal: '='},
        {type: tokenPool.PLUS, literal: '+'},
        {type: tokenPool.LPAREN, literal: '('},
        {type: tokenPool.RPAREN, literal: ')'},
        {type: tokenPool.LBRACE, literal: '{'},
        {type: tokenPool.RBRACE, literal: '}'},
        {type: tokenPool.COMMA, literal: ','},
        {type: tokenPool.SEMICOLON, literal: ';'},
        {type: tokenPool.EOF, literal: ''},
    ];

    const lexer = Lexer().init({input: input});
    for (let testToken of tokenTestCase) {
        const currentToken = lexer.nextToken();
        expect(currentToken.type).to.equal(testToken.type);
        expect(currentToken.literal).to.equal(testToken.literal);
    }
});

it('코드 형태 데이터에 대한 lexer 테스트', () => {
    const input = `
  let five = 5;
  let ten = 10;
  
  let add = fn(x,y) {
    x + y;
  };
  
  let result = add(five,ten);
  
  !-/*5;
  
  5<10 > 5;
  
  if(5<10){
    return true;
  } else {
    return false;
  }
  
  10 ==10;
  10 !=9;
  `;
    const tokenTestCase: Ttoken[] = [
        {type: tokenPool.LET, literal: 'let'},
        {type: tokenPool.IDENT, literal: 'five'},
        {type: tokenPool.ASSIGN, literal: '='},
        {type: tokenPool.INT, literal: '5'},
        {type: tokenPool.SEMICOLON, literal: ';'},//let five = 5;
        {type: tokenPool.LET, literal: 'let'},
        {type: tokenPool.IDENT, literal: 'ten'},
        {type: tokenPool.ASSIGN, literal: '='},
        {type: tokenPool.INT, literal: '10'},
        {type: tokenPool.SEMICOLON, literal: ';'},//let ten = 10;
        {type: tokenPool.LET, literal: 'let'},
        {type: tokenPool.IDENT, literal: 'add'},
        {type: tokenPool.ASSIGN, literal: '='},
        {type: tokenPool.FUNCTION, literal: 'fn'},
        {type: tokenPool.LPAREN, literal: '('},
        {type: tokenPool.IDENT, literal: 'x'},
        {type: tokenPool.COMMA, literal: ','},
        {type: tokenPool.IDENT, literal: 'y'},
        {type: tokenPool.RPAREN, literal: ')'},
        {type: tokenPool.LBRACE, literal: '{'},
        {type: tokenPool.IDENT, literal: 'x'},
        {type: tokenPool.PLUS, literal: '+'},
        {type: tokenPool.IDENT, literal: 'y'},
        {type: tokenPool.SEMICOLON, literal: ';'},
        {type: tokenPool.RBRACE, literal: '}'},
        {type: tokenPool.SEMICOLON, literal: ';'},//let add = fn(x,y) {x+y};
        {type: tokenPool.LET, literal: 'let'},
        {type: tokenPool.IDENT, literal: 'result'},
        {type: tokenPool.ASSIGN, literal: '='},
        {type: tokenPool.IDENT, literal: 'add'},
        {type: tokenPool.LPAREN, literal: '('},
        {type: tokenPool.IDENT, literal: 'five'},
        {type: tokenPool.COMMA, literal: ','},
        {type: tokenPool.IDENT, literal: 'ten'},
        {type: tokenPool.RPAREN, literal: ')'},
        {type: tokenPool.SEMICOLON, literal: ';'},//let result = add(five,ten);
        {type: tokenPool.BANG, literal: '!'},
        {type: tokenPool.MINUS, literal: '-'},
        {type: tokenPool.SLASH, literal: '/'},
        {type: tokenPool.ASTERISK, literal: '*'},
        {type: tokenPool.INT, literal: '5'},
        {type: tokenPool.SEMICOLON, literal: ';'},//  !-/*5;
        {type: tokenPool.INT, literal: '5'},
        {type: tokenPool.LT, literal: '<'},
        {type: tokenPool.INT, literal: '10'},
        {type: tokenPool.GT, literal: '>'},
        {type: tokenPool.INT, literal: '5'},
        {type: tokenPool.SEMICOLON, literal: ';'},// 5<10 > 5;
        {type: tokenPool.IF, literal: 'if'},
        {type: tokenPool.LPAREN, literal: '('},
        {type: tokenPool.INT, literal: '5'},
        {type: tokenPool.LT, literal: '<'},
        {type: tokenPool.INT, literal: '10'},
        {type: tokenPool.RPAREN, literal: ')'},
        {type: tokenPool.LBRACE, literal: '{'},
        {type: tokenPool.RETURN, literal: 'return'},
        {type: tokenPool.TRUE, literal: 'true'},
        {type: tokenPool.SEMICOLON, literal: ';'},
        {type: tokenPool.RBRACE, literal: '}'},
        {type: tokenPool.ELSE, literal: 'else'},
        {type: tokenPool.LBRACE, literal: '{'},
        {type: tokenPool.RETURN, literal: 'return'},
        {type: tokenPool.FALSE, literal: 'false'},
        {type: tokenPool.SEMICOLON, literal: ';'},
        {type: tokenPool.RBRACE, literal: '}'},//
        {type: tokenPool.INT, literal: '10'},
        {type: tokenPool.EQ, literal: '=='},
        {type: tokenPool.INT, literal: '10'},
        {type: tokenPool.SEMICOLON, literal: ';'},
        {type: tokenPool.INT, literal: '10'},
        {type: tokenPool.NOT_EQ, literal: '!='},
        {type: tokenPool.INT, literal: '9'},
        {type: tokenPool.SEMICOLON, literal: ';'},
        {type: tokenPool.EOF, literal: ''},
    ];

    const lexer = Lexer().init({input: input});
    for (let testToken of tokenTestCase) {
        const currentToken = lexer.nextToken();
        expect(currentToken.type).to.equal(testToken.type);
        expect(currentToken.literal).to.equal(testToken.literal);
    }
});