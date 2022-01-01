import {TExpressionOutput, TIdentifierState} from '../types/ast';
import {getTokenLiteral} from './getTokenLiteral';

export function createIdentifier(): TExpressionOutput {
    let identifierState: TIdentifierState;
    const expressionNode = () => {

    };

    const tokenLiteral = () => getTokenLiteral(identifierState);
    return {
        tokenLiteral,
        expressionNode,
    };
}