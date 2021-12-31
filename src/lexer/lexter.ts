import {TlexerInput, TlexerState} from '../types/lexer';
import {Ttoken} from '../types/token';
import tokenPool from '../token/tokenPool';
import {isDigit, isLetter} from '../util/charUtil';
import {lookupIdent} from '../token/keywords';

export function createLexer() {
    const lexerState: TlexerState = {
        input: '',
        cursor: 0,
        nextCursor: 0,
        cursorChar: '',
    };

    const init = (lexerInput: TlexerInput) => {
        const {input} = lexerInput;
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

    const readUntil = (checkFunction: (arg: string | null) => boolean) => {
        const sCursor = lexerState.cursor;
        while (checkFunction(lexerState.cursorChar)) {
            readChar();
        }
        return lexerState.input.slice(sCursor, lexerState.cursor);
    };

    const skipWhiteSpace = () => {
        if (!lexerState.cursorChar) return;
        while ([' ', '\t', '\n', '\r'].includes(lexerState.cursorChar)) {
            readChar();
        }
    };

    const readDoubleToken = (preType: string): Ttoken => {
        const doubleToken = lexerState.cursorChar + lexerState.input[lexerState.nextCursor];
        const nextToken: Ttoken | undefined = {
            '==': {Type: tokenPool.EQ, Literal: doubleToken},
            '!=': {Type: tokenPool.NOT_EQ, Literal: doubleToken},
        }[doubleToken];

        if (!nextToken) {
            return {Type: preType, Literal: lexerState.cursorChar as string};
        }

        readChar();
        return nextToken;
    };

    const nextToken = (): Ttoken => {
        skipWhiteSpace();

        if (lexerState.cursorChar === null) {
            readChar();
            return {Type: tokenPool.EOF, Literal: ''};
        }

        if (isLetter(lexerState.cursorChar)) {
            const identifier = readUntil(isLetter);
            return {Type: lookupIdent(identifier), Literal: identifier};
        }

        if (isDigit(lexerState.cursorChar)) {
            const digitToken = readUntil(isDigit);
            return {Type: tokenPool.INT, Literal: digitToken};
        }

        const tok: Ttoken | undefined = {
            '=': readDoubleToken(tokenPool.ASSIGN),
            ';': {Type: tokenPool.SEMICOLON, Literal: lexerState.cursorChar},
            '(': {Type: tokenPool.LPAREN, Literal: lexerState.cursorChar},
            ')': {Type: tokenPool.RPAREN, Literal: lexerState.cursorChar},
            ',': {Type: tokenPool.COMMA, Literal: lexerState.cursorChar},
            '+': {Type: tokenPool.PLUS, Literal: lexerState.cursorChar},
            '-': {Type: tokenPool.MINUS, Literal: lexerState.cursorChar},
            '!': readDoubleToken(tokenPool.BANG),
            '/': {Type: tokenPool.SLASH, Literal: lexerState.cursorChar},
            '*': {Type: tokenPool.ASTERISK, Literal: lexerState.cursorChar},
            '<': {Type: tokenPool.LT, Literal: lexerState.cursorChar},
            '>': {Type: tokenPool.GT, Literal: lexerState.cursorChar},
            '{': {Type: tokenPool.LBRACE, Literal: lexerState.cursorChar},
            '}': {Type: tokenPool.RBRACE, Literal: lexerState.cursorChar},
        }[lexerState.cursorChar];
        readChar();

        if (tok === undefined)
            throw new Error(`식별할 수 없는 토큰 ${lexerState.cursorChar}`);

        return tok;
    };

    return {
        init,
    };
}
