import tokenPool from './tokenPool';

type Tkeyword = {[k: string]: string}

/* 언어에서 지원하는 예약어 목록 */
export const keywords: Tkeyword = {
    'function': tokenPool.FUNCTION,
    'let': tokenPool.LET,
    'true': tokenPool.TRUE,
    'false': tokenPool.FALSE,
    'if': tokenPool.IF,
    'else': tokenPool.ELSE,
    'return': tokenPool.RETURN,
};

/* 예약어가 아닌 문자는 IDENT 이다.*/
export const lookupIdent = (ident: string) => {
    if (keywords[ident]) {
        return keywords[ident];
    }
    return tokenPool.IDENT;
};