import {TIdentifierInput, TIdentifierOutput, TIdentifierState} from '../types/ast';
import {getTokenLiteral} from './getTokenLiteral';
import {Ttoken} from '../types/token';

export function createIdentifier(token: Ttoken) {
    let identifierState: TIdentifierState = {
        value: undefined,
        token: token,
    };

    const init = (input: TIdentifierInput): TIdentifierOutput => {
        const {value} = input;
        return {
            tokenLiteral,
            value: value,
            token: identifierState.token,
        };
    };
    const expressionNode = () => {

    };

    const tokenLiteral = () => getTokenLiteral(identifierState);
    return {
        init,
    };
}