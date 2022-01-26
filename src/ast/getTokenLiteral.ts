import {TTokenBase} from '../types/ast/ast';

export const getTokenLiteral = (tokenBase: TTokenBase) => () => {
    return tokenBase.token.literal;
};
