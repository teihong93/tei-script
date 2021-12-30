import { TlexerInput, TlexerState } from "../types/lexer";
import { Ttoken } from "../types/token";
import tokenPool from "../token/tokenPool";

export function createLexer() {
  const lexerState: TlexerState = {
    input: "",
    cursor: 0,
    nextCursor: 0,
    cursorChar: "",
  };

  const init = (lexerInput: TlexerInput) => {
    const { input } = lexerInput;
    lexerState.input = input;
    readChar();

    return {
      nextToken,
    };
  };

  const readChar = () => {
    if (lexerState.nextCursor >= lexerState.input.length) {
      lexerState.cursorChar = null;
    } else {
      lexerState.cursorChar = lexerState.input[lexerState.nextCursor];
    }
    lexerState.cursor = lexerState.nextCursor;
    lexerState.nextCursor += 1;
  };

  const nextToken = (): Ttoken => {
    let tok: Ttoken | undefined;

    if (lexerState.cursorChar === null) {
      tok = { Type: tokenPool.EOF, Literal: "" };
    } else {
      tok = {
        "=": { Type: tokenPool.ASSIGN, Literal: lexerState.cursorChar },
        ";": { Type: tokenPool.SEMICOLON, Literal: lexerState.cursorChar },
        "(": { Type: tokenPool.LPAREN, Literal: lexerState.cursorChar },
        ")": { Type: tokenPool.RPAREN, Literal: lexerState.cursorChar },
        ",": { Type: tokenPool.COMMA, Literal: lexerState.cursorChar },
        "+": { Type: tokenPool.PLUS, Literal: lexerState.cursorChar },
        "{": { Type: tokenPool.LBRACE, Literal: lexerState.cursorChar },
        "}": { Type: tokenPool.RBRACE, Literal: lexerState.cursorChar },
      }[lexerState.cursorChar];
    }

    if (tok === undefined)
      throw new Error(`식별할 수 없는 토큰 ${lexerState.cursorChar}`);

    readChar();
    return tok;
  };

  return {
    init,
  };
}
