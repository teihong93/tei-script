import {expect} from "chai";
import {Ttoken} from "../types/token";
import tokenPool from "../token/tokenPool";
import {createLexer} from "./lexter";

it("토큰 테스트", () => {
    const input = "=+(){},;";
    const tokenTestCase: Ttoken[] = [
        {Type: tokenPool.ASSIGN, Literal: "="},
        {Type: tokenPool.PLUS, Literal: "+"},
        {Type: tokenPool.LPAREN, Literal: "("},
        {Type: tokenPool.RPAREN, Literal: ")"},
        {Type: tokenPool.LBRACE, Literal: "{"},
        {Type: tokenPool.RBRACE, Literal: "}"},
        {Type: tokenPool.COMMA, Literal: ","},
        {Type: tokenPool.SEMICOLON, Literal: ";"},
        {Type: tokenPool.EOF, Literal: ""},
    ];

    const lexer = createLexer().init({input: input});
    for (let testToken of tokenTestCase) {
        const currentToken = lexer.nextToken();
        expect(currentToken.Type).to.equal(testToken.Type);
        expect(currentToken.Literal).to.equal(testToken.Literal);
    }
});

it("코드 형태 데이터에 대한 lexer 테스트", () => {
    const input = `
  let five = 5;
  let ten = 10;
  
  let add = fn(x,y) {
    x + y;
  };
  
  let result = add(five,ten);
  `;
    const tokenTestCase: Ttoken[] = [
        {Type: tokenPool.LET, Literal: "let"},
        {Type: tokenPool.IDENT, Literal: "five"},
        {Type: tokenPool.ASSIGN, Literal: "="},
        {Type: tokenPool.INT, Literal: "5"},
        {Type: tokenPool.SEMICOLON, Literal: ";"},//let five = 5;
        {Type: tokenPool.LET, Literal: "let"},
        {Type: tokenPool.IDENT, Literal: "ten"},
        {Type: tokenPool.ASSIGN, Literal: "="},
        {Type: tokenPool.INT, Literal: "10"},
        {Type: tokenPool.SEMICOLON, Literal: ";"},//let ten = 10;
        {Type: tokenPool.LET, Literal: "let"},
        {Type: tokenPool.IDENT, Literal: "add"},
        {Type: tokenPool.ASSIGN, Literal: "="},
        {Type: tokenPool.FUNCTION, Literal: "fn"},
        {Type: tokenPool.LPAREN, Literal: "("},
        {Type: tokenPool.IDENT, Literal: "x"},
        {Type: tokenPool.COMMA, Literal: ","},
        {Type: tokenPool.IDENT, Literal: "y"},
        {Type: tokenPool.RPAREN, Literal: ")"},
        {Type: tokenPool.LBRACE, Literal: "{"},
        {Type: tokenPool.IDENT, Literal: "x"},
        {Type: tokenPool.PLUS, Literal: "+"},
        {Type: tokenPool.IDENT, Literal: "y"},
        {Type: tokenPool.SEMICOLON, Literal: ";"},
        {Type: tokenPool.RBRACE, Literal: "}"},
        {Type: tokenPool.SEMICOLON, Literal: ";"},//let add = fn(x,y) {x+y};
        {Type: tokenPool.LET, Literal: "let"},
        {Type: tokenPool.IDENT, Literal: "result"},
        {Type: tokenPool.ASSIGN, Literal: "="},
        {Type: tokenPool.IDENT, Literal: "add"},
        {Type: tokenPool.LPAREN, Literal: "("},
        {Type: tokenPool.IDENT, Literal: "five"},
        {Type: tokenPool.COMMA, Literal: ","},
        {Type: tokenPool.IDENT, Literal: "ten"},
        {Type: tokenPool.RPAREN, Literal: ")"},
        {Type: tokenPool.SEMICOLON, Literal: ";"},
        {Type: tokenPool.EOF, Literal: ""},
    ];

    const lexer = createLexer().init({input: input});
    for (let testToken of tokenTestCase) {
        const currentToken = lexer.nextToken();
        console.log(currentToken)
        expect(currentToken.Type).to.equal(testToken.Type);
        expect(currentToken.Literal).to.equal(testToken.Literal);
    }
});