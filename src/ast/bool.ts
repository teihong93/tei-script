import {getTokenLiteral} from './getTokenLiteral';
import {TBoolInput, TBool} from '../types/ast/bool';
import {Ttoken} from '../types/token';
import nodePool from './nodePool';

export function Bool(input: TBoolInput): TBool {

    let token: Ttoken = {...input.token};
    let value = input.value;

    return {
        tokenLiteral: getTokenLiteral({token}),
        string: getTokenLiteral({token}),
        value,
        token,
        type:nodePool.BOOL,
    };
}