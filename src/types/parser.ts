import {Tlexer} from './lexer';
import {Ttoken} from './token';
import {TProgram} from './ast';

export type TParserInput = {
    /* 렉서의 인스턴스 */
    lexer: Tlexer,
}

/* parser 인스턴스가 제공해야 할 공개 함수들*/
export type TParser = {
    parseProgram: () => TProgram,
    errors: () => string[]
}

