import {TStatement} from '../types/ast/ast';
import {getTokenLiteral} from './getTokenLiteral';
import {TLetStatement, TLetStatementInput} from '../types/ast/letState';
import {TIdentifier} from '../types/ast/identifier';
import {TExpression} from '../types/ast/expression';

export function LetStatement(input: TLetStatementInput): TLetStatement {

    let name: TIdentifier = input.name;
    let value: TExpression | undefined = input.value;     /* 값을 생성하는 표현식 */

    const statementNode = () => {};

    const tokenLiteral = () => getTokenLiteral({token: input.token});
    return {
        tokenLiteral,
        statementNode,
        name,
        value,
        token:input.token
    };
}