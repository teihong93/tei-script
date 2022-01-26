import {getTokenLiteral} from './getTokenLiteral';
import {TExpressionStatement, TExpressionStatementInput} from '../types/ast/expressionStatement';
import {Ttoken} from '../types/token';


export function ExpressionStatement(input: TExpressionStatementInput): TExpressionStatement {

    const expression = input.expression;
    let token:Ttoken = {...input.token}

    const statementNode = () => {
    };

    const string = () => expression?.string() || '';

    return {
        tokenLiteral:getTokenLiteral({token}),
        statementNode,
        expression,
        string,
        token
    };
}