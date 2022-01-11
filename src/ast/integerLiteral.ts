import {getTokenLiteral} from './getTokenLiteral';
import {TIntegerLiteral, TIntegerLiteralInput} from '../types/ast/integerLiteral';

export function IntegerLiteral(input: TIntegerLiteralInput): TIntegerLiteral {

    let value:number = input.value;

    const expressionNode = () => {};

    const tokenLiteral = () => getTokenLiteral({token:input.token});

    const string = () => `${input.value}`

    return {
        tokenLiteral,
        value: value,
        token: input.token,
        string
    };
}