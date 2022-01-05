import {IExpression, TIdentifier, TLetStatementStateInput, TStatement} from '../types/ast';
import {getTokenLiteral} from './getTokenLiteral';
import {Ttoken} from '../types/token';

export function LetStatement(token: Ttoken) {


    let name: TIdentifier | undefined;
    /* 값을 생성하는 표현식 */
    let value: IExpression | undefined;

    const init = (input: TLetStatementStateInput): TStatement => {
        name = input.name;
        value = input.value;
        return {
            tokenLiteral,
            statementNode,
            getStatement: () => ({
                name: name as TIdentifier,
                value: value,
                token,
            }),
        };
    };

    const statementNode = () => {

    };

    const tokenLiteral = () => getTokenLiteral({token});
    return {
        init,
    };
}