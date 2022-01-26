import {getTokenLiteral} from './getTokenLiteral';
import {TBoolInput, TBool} from '../types/ast/bool';
import {Ttoken} from '../types/token';

export function Bool(input: TBoolInput): TBool {

    let token:Ttoken = {...input.token}
    let value = input.value

    return {
        tokenLiteral:getTokenLiteral({token}),
        string:getTokenLiteral({token}),
        value,
        token,
    };
}