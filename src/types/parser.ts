import {TlexerOutput} from './lexer';
import {Ttoken} from './token';
import {TProgramOutput} from './ast';

export type TParserInput = {
    /* 렉서의 인스턴스 */
    lexer: TlexerOutput,
}

export type TParserState = {
    /* 렉서의 인스턴스 */
    lexer: TlexerOutput | undefined,
    /* 현재 토큰 */
    currentToken: Ttoken | undefined,
    /* 다음 읽을 토큰 */
    nextToken: Ttoken | undefined,
    /* 파싱 에러 메시지 목록 */
    errors: string[]
}

/* parser 인스턴스가 제공해야 할 공개 함수들*/
export type TParserOutput = {
    parseProgram: () => TProgramOutput,
    errors: () => string[]
}

