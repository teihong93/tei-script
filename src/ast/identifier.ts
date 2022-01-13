import {getTokenLiteral} from './getTokenLiteral';
import {TIdentifier, TIdentifierInput} from '../types/ast/identifier';

export function Identifier(input: TIdentifierInput): TIdentifier {

    let value:string = input.value;

    const tokenLiteral = () => getTokenLiteral({token:input.token});
    const string = () => value

    return {
        tokenLiteral,
        value,
        string,
        token: input.token,
    };
}