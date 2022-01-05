import {TlexerInput, Tlexer} from '../types/lexer';
import {Ttoken} from '../types/token';
import tokenPool from '../token/tokenPool';
import {isDigit, isLetter} from '../util/charUtil';
import {lookupIdent} from '../token/keywords';

export function Lexer(lexerInput: TlexerInput): Tlexer {
    let input: string = lexerInput.input;
    let cursor: number = 0;     /* 렉서의 현재 커서 */
    let nextCursor: number = 0;     /* 렉서의 다음 커서 */
    let cursorChar: string | null;    /* 현재 커서가 가르키는 문자 , 마지막까지 읽었으면 null */

    const init = () => {
        readChar();
    };

    const readChar = () => {
        if (nextCursor >= input.length) {
            cursorChar = null;
        } else {
            cursorChar = input[nextCursor];
        }
        cursor = nextCursor;
        nextCursor += 1;
    };

    const readUntil = (checkFunction: (arg: string | null) => boolean) => {
        const sCursor = cursor;
        while (checkFunction(cursorChar)) {
            readChar();
        }
        return input.slice(sCursor, cursor);
    };

    const skipWhiteSpace = () => {
        if (!cursorChar) return;
        while ([' ', '\t', '\n', '\r'].includes(cursorChar)) {
            readChar();
        }
    };

    const readDoubleToken = (preType: string): Ttoken => {
        const doubleToken = cursorChar + input[nextCursor];
        const nextToken: Ttoken | undefined = {
            '==': {type: tokenPool.EQ, literal: doubleToken},
            '!=': {type: tokenPool.NOT_EQ, literal: doubleToken},
        }[doubleToken];

        if (!nextToken) {
            return {type: preType, literal: cursorChar as string};
        }

        readChar();
        return nextToken;
    };

    const nextToken = (): Ttoken => {
        skipWhiteSpace();

        if (cursorChar === null) {
            readChar();
            return {type: tokenPool.EOF, literal: ''};
        }

        if (isLetter(cursorChar)) {
            const identifier = readUntil(isLetter);
            return {type: lookupIdent(identifier), literal: identifier};
        }

        if (isDigit(cursorChar)) {
            const digitToken = readUntil(isDigit);
            return {type: tokenPool.INT, literal: digitToken};
        }

        const tok: Ttoken | undefined = {
            '=': readDoubleToken(tokenPool.ASSIGN),
            ';': {type: tokenPool.SEMICOLON, literal: cursorChar},
            '(': {type: tokenPool.LPAREN, literal: cursorChar},
            ')': {type: tokenPool.RPAREN, literal: cursorChar},
            ',': {type: tokenPool.COMMA, literal: cursorChar},
            '+': {type: tokenPool.PLUS, literal: cursorChar},
            '-': {type: tokenPool.MINUS, literal: cursorChar},
            '!': readDoubleToken(tokenPool.BANG),
            '/': {type: tokenPool.SLASH, literal: cursorChar},
            '*': {type: tokenPool.ASTERISK, literal: cursorChar},
            '<': {type: tokenPool.LT, literal: cursorChar},
            '>': {type: tokenPool.GT, literal: cursorChar},
            '{': {type: tokenPool.LBRACE, literal: cursorChar},
            '}': {type: tokenPool.RBRACE, literal: cursorChar},
        }[cursorChar];
        readChar();

        if (tok === undefined)
            throw new Error(`식별할 수 없는 토큰 ${cursorChar}`);

        return tok;
    };

    init();
    return {
        nextToken,
    };
}
