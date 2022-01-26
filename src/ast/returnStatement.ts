import {getTokenLiteral} from './getTokenLiteral';
import {TReturnStatement, TReturnStatementInput} from '../types/ast/returnStatement';
import {TExpression} from '../types/ast/expression';
import {Ttoken} from '../types/token';


export function ReturnStatement(input: TReturnStatementInput): TReturnStatement {

    let returnValue: TExpression;
    let token:Ttoken = {...input.token}

    const statementNode = () => {
    };

    const tokenLiteral = getTokenLiteral({token});

    const string = () => {
        return `${tokenLiteral()} ${returnValue ? returnValue.string() : ''} ;`;
    };

    return {
        tokenLiteral,
        statementNode,
        string,
        token,
    };
}