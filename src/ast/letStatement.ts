import {TLetStatementState, TLetStatementStateInput, TStatementOutput} from '../types/ast';
import {getTokenLiteral} from './getTokenLiteral';
import {Ttoken} from '../types/token';

export function createLetStatement(token: Ttoken) {
    let letStatementState: TLetStatementState = {
        name: undefined,
        value: undefined,
        token: token,
    };

    const init = (input: TLetStatementStateInput): TStatementOutput => {
        const {name, value} = input;
        letStatementState.name = name;
        letStatementState.value = value;
        return {
            tokenLiteral,
            statementNode,
            getStatement: () => letStatementState,
        };
    };

    const statementNode = () => {

    };

    const tokenLiteral = () => getTokenLiteral(letStatementState);
    return {
        init,
    };
}