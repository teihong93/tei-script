import {TTokenBase} from '../types/ast';

export const getTokenLiteral = (tokenBase:TTokenBase) => {
    return tokenBase.token.literal
}
