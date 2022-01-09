import {Tlexer} from './lexer';
import {Ttoken, TtokenType} from './token';
import {TProgram} from './ast/program';
import {TExpression} from './ast/expression';
import tokenPool from '../token/tokenPool';

export type TParserInput = {
    /* 렉서의 인스턴스 */
    lexer: Tlexer,
}

/* parser 인스턴스가 제공해야 할 공개 함수들*/
export type TParser = {
    parseProgram: () => TProgram,
    errors: () => string[]
}

export type TprefixParseFn = () => TExpression
export type TinfixParseFn = (expression: TExpression) => TExpression

export type TPrefixParseFns = Map<TtokenType,TprefixParseFn>
export type TinfixParseFns = Map<TtokenType,TinfixParseFn>
