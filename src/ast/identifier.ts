
import {getTokenLiteral} from './getTokenLiteral';
import {Ttoken} from '../types/token';
import {TIdentifier, TIdentifierInput} from '../types/ast/identifier';

export function Identifier(input: TIdentifierInput): TIdentifier {

    let value:string = input.value;

    const expressionNode = () => {};

    const tokenLiteral = () => getTokenLiteral({token:input.token});
    return {
        tokenLiteral,
        value: value,
        token: input.token,
    };
}