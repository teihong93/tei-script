import {TinfixParseFn, TinfixParseFns, TprefixParseFn, TPrefixParseFns} from '../types/parser';
import {tokenTypes, TtokenType} from '../types/token';

/*
    중위연산자, 후위연산자 관리할 함수.
*/

export function ParseFns() {
    let prefixParseFns: TPrefixParseFns = new Map<TtokenType, TprefixParseFn>();
    let infixParseFns: TinfixParseFns = new Map<TtokenType, TinfixParseFn>();

    const registerPrefix = (token: tokenTypes, fn: TprefixParseFn) => {
        prefixParseFns.set(token, fn);
    };

    const registerInfix = (token: tokenTypes, fn: TinfixParseFn) => {
        infixParseFns.set(token, fn);
    };

    return {
        registerPrefix,
        registerInfix,
        getPrefixParseFns:(key:tokenTypes)=>prefixParseFns.get(key),
        getInfixParseFns:(key:tokenTypes)=>infixParseFns.get(key),
    };
}