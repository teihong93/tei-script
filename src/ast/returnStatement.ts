
import {getTokenLiteral} from './getTokenLiteral';
import {TReturnStatement, TReturnStatementInput} from '../types/ast/returnState';


export function ReturnStatement(input: TReturnStatementInput): TReturnStatement {

    const statementNode = () => {
    };

    const tokenLiteral = () => getTokenLiteral({token: input.token});
    return {
        tokenLiteral,
        token: input.token,
        statementNode
    };
}