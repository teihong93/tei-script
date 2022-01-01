import {TLetStatementState, TStatementOutput} from '../types/ast';
import {getTokenLiteral} from './getTokenLiteral';

export function createLetStatement(): TStatementOutput {
    let letStatementState: TLetStatementState;
    const statementNode = () => {

    };
    const tokenLiteral = () => getTokenLiteral(letStatementState);
    return {
        tokenLiteral,
        statementNode,
        getStatement: () => letStatementState,
    };
}