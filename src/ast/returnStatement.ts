import {getTokenLiteral} from './getTokenLiteral';
import {TReturnStatement, TReturnStatementInput} from '../types/ast/returnStatement';
import {TExpression} from '../types/ast/expression';


export function ReturnStatement(input: TReturnStatementInput): TReturnStatement {

    let returnValue: TExpression;

    const statementNode = () => {
    };

    const tokenLiteral = () => getTokenLiteral({token: input.token});

    const string = () => {
        return `${tokenLiteral()} ${returnValue ? returnValue.string() : ''} ;`;
    };

    return {
        tokenLiteral,
        token: input.token,
        statementNode,
        string
    };
}