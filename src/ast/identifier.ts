import {getTokenLiteral} from './getTokenLiteral';
import {TIdentifier, TIdentifierInput} from '../types/ast/identifier';
import {Ttoken} from '../types/token';
import nodePool from './nodePool';

export function Identifier(input: TIdentifierInput): TIdentifier {

    let value: string = input.value;
    let token: Ttoken = {...input.token};

    const string = () => {
        return value;
    };

    return {
        tokenLiteral: getTokenLiteral({token}),
        value,
        string,
        token,
        type:nodePool.IDENTIFIER,
    };
}