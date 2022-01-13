import {getTokenLiteral} from './getTokenLiteral';
import {TIntegerLiteral, TIntegerLiteralInput} from '../types/ast/integerLiteral';

export function IntegerLiteral(input: TIntegerLiteralInput): TIntegerLiteral {

    let value:number = input.value;

    const tokenLiteral = () => getTokenLiteral({token:input.token});
    const string = () => `${input.value}`

    return {
        tokenLiteral,
        value,
        string,
        token: input.token,
    };
}