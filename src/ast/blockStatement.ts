import {getTokenLiteral} from './getTokenLiteral';
import {TBlockStatement, TBlockStatementInput} from '../types/ast/blockStatement';

export function BlockStatement(input: TBlockStatementInput): TBlockStatement {
    const token = {...input.token};
    const statements = [...input.statements];

    const statementNode = () => {
    };

    const tokenLiteral = getTokenLiteral({token});

    const string = () => statements.reduce((acc, e) => acc + e.string(), '');

    return {
        tokenLiteral,
        statements,
        string,
        token,
        statementNode,
    };
}