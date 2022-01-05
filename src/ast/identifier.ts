import {TIdentifierInput, TIdentifier} from '../types/ast';
import {getTokenLiteral} from './getTokenLiteral';
import {Ttoken} from '../types/token';

export function createIdentifier(token: Ttoken) {

    let value:string = ""

    const init = (input: TIdentifierInput): TIdentifier => {
        value = input.value;
        return {
            tokenLiteral,
            value: value,
            token: token,
        };
    };
    const expressionNode = () => {

    };

    const tokenLiteral = () => getTokenLiteral({token});
    return {
        init,
    };
}