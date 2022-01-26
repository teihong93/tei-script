import {getTokenLiteral} from './getTokenLiteral';
import {TIntegerLiteral, TIntegerLiteralInput} from '../types/ast/integerLiteral';
import {Ttoken} from '../types/token';

export function IntegerLiteral(input: TIntegerLiteralInput): TIntegerLiteral {

    let value:number = input.value;
    let token:Ttoken = {...input.token}

    const string = () => `${input.value}`

    return {
        tokenLiteral:getTokenLiteral({token}),
        value,
        string,
        token,
    };
}