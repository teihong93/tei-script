import {TlexerInput, TlexerOutput, TlexerState} from '../types/lexer';
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

    const init = (lexerInput: TlexerInput): TlexerOutput => {
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
            '==': {type: tokenPool.EQ, literal: doubleToken},
            '!=': {type: tokenPool.NOT_EQ, literal: doubleToken},
        }[doubleToken];

        if (!nextToken) {
            return {type: preType, literal: lexerState.cursorChar as string};
        }

        readChar();
        return nextToken;
    };

    const nextToken = (): Ttoken => {
        skipWhiteSpace();

        if (lexerState.cursorChar === null) {
            readChar();
            return {type: tokenPool.EOF, literal: ''};
        }

        if (isLetter(lexerState.cursorChar)) {
            const identifier = readUntil(isLetter);
            return {type: lookupIdent(identifier), literal: identifier};
        }

        if (isDigit(lexerState.cursorChar)) {
            const digitToken = readUntil(isDigit);
            return {type: tokenPool.INT, literal: digitToken};
        }

        const tok: Ttoken | undefined = {
            '=': readDoubleToken(tokenPool.ASSIGN),
            ';': {type: tokenPool.SEMICOLON, literal: lexerState.cursorChar},
            '(': {type: tokenPool.LPAREN, literal: lexerState.cursorChar},
            ')': {type: tokenPool.RPAREN, literal: lexerState.cursorChar},
            ',': {type: tokenPool.COMMA, literal: lexerState.cursorChar},
            '+': {type: tokenPool.PLUS, literal: lexerState.cursorChar},
            '-': {type: tokenPool.MINUS, literal: lexerState.cursorChar},
            '!': readDoubleToken(tokenPool.BANG),
            '/': {type: tokenPool.SLASH, literal: lexerState.cursorChar},
            '*': {type: tokenPool.ASTERISK, literal: lexerState.cursorChar},
            '<': {type: tokenPool.LT, literal: lexerState.cursorChar},
            '>': {type: tokenPool.GT, literal: lexerState.cursorChar},
            '{': {type: tokenPool.LBRACE, literal: lexerState.cursorChar},
            '}': {type: tokenPool.RBRACE, literal: lexerState.cursorChar},
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
