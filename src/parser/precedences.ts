/* 연산자 우선순위.*/
import tokenPool from '../token/tokenPool';
import {TtokenType} from '../types/token';

export const enum precedences {
    LOWEST,
    EQUALS,
    LESSGREATER,
    SUM,
    PRODUCT,
    PREFIX,
    CALL
}

export function Precedence() {
    const precendencesMap = {
        [tokenPool.EQ]: precedences.EQUALS,
        [tokenPool.NOT_EQ]: precedences.EQUALS,
        [tokenPool.LT]: precedences.LESSGREATER,
        [tokenPool.GT]: precedences.LESSGREATER,
        [tokenPool.PLUS]: precedences.SUM,
        [tokenPool.MINUS]: precedences.SUM,
        [tokenPool.SLASH]: precedences.PRODUCT,
        [tokenPool.ASTERISK]: precedences.PRODUCT,
    };

    const getPrecedences = (tokenType: TtokenType): precedences => {
        if (precendencesMap[tokenType]) {
            return precendencesMap[tokenType];
        }
        return precedences.LOWEST;
    };

    return{
        getPrecedences
    }
}