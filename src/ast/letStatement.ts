import {IExpression, TIdentifier, TLetStatementStateInput, TStatement} from '../types/ast';
import {getTokenLiteral} from './getTokenLiteral';

export function LetStatement(input: TLetStatementStateInput): TStatement {

    let name: TIdentifier = input.name;
    let value: IExpression | undefined = input.value;     /* 값을 생성하는 표현식 */

    const statementNode = () => {};

    const tokenLiteral = () => getTokenLiteral({token: input.token});
    return {
        tokenLiteral,
        statementNode,
        getStatement: () => ({
            name: name,
            value: value,
            token: input.token,
        }),
    };
}