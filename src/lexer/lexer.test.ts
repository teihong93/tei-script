import { expect } from "chai";
import { Ttoken } from "../types/token";
import tokenPool from "../token/tokenPool";
import { createLexer } from "./lexter";

it("토큰 테스트", () => {
  const input = "=+(){},;";
  const tokenTestCase: Ttoken[] = [
    { Type: tokenPool.ASSIGN, Literal: "=" },
    { Type: tokenPool.PLUS, Literal: "+" },
    { Type: tokenPool.LPAREN, Literal: "(" },
    { Type: tokenPool.RPAREN, Literal: ")" },
    { Type: tokenPool.LBRACE, Literal: "{" },
    { Type: tokenPool.RBRACE, Literal: "}" },
    { Type: tokenPool.COMMA, Literal: "," },
    { Type: tokenPool.SEMICOLON, Literal: ";" },
    { Type: tokenPool.EOF, Literal: "" },
  ];

  const lexer = createLexer().init({ input: input });
  for (let testToken of tokenTestCase) {
    const currentToken = lexer.nextToken();
    expect(currentToken.Type).to.equal(testToken.Type);
    expect(currentToken.Literal).to.equal(testToken.Literal);
  }
});
