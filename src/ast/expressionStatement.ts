import {getTokenLiteral} from './getTokenLiteral';
import {TExpressionStatement, TExpressionStatementInput} from '../types/ast/expressionStatement';


export function ExpressionStatement(input: TExpressionStatementInput): TExpressionStatement {

    const expression = input.expression;

    const statementNode = () => {
    };

    const tokenLiteral = () => getTokenLiteral({token: input.token});

    const string = () => expression?.string() || '';

    return {
        tokenLiteral,
        statementNode,
        expression,
        string,
        token: input.token,
    };
}