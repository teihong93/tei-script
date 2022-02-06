import {getTokenLiteral} from './getTokenLiteral';
import {TLetStatement, TLetStatementInput} from '../types/ast/letStatement';
import {TIdentifier} from '../types/ast/identifier';
import {TExpression} from '../types/ast/expression';
import {Ttoken} from '../types/token';
import nodePool from './nodePool';

export function LetStatement(input: TLetStatementInput): TLetStatement {

    let name: TIdentifier;
    let value: TExpression;     /* 값을 생성하는 표현식 */
    let token: Ttoken = {...input.token};

    const statementNode = () => {
    };

    const tokenLiteral = getTokenLiteral({token});

    const string = () => {
        return `${tokenLiteral()} ${name.string()} = ${value ? value.string() : ''};`;
    };

    const getName = () => name;
    const setName = (nameArg: TIdentifier) => {
        name = nameArg;
    };
    const getValue = () => value;
    const setValue = (valueArg: TExpression) => {
        value = valueArg;
    };

    return {
        tokenLiteral,
        statementNode,
        string,
        getName,
        setName,
        getValue,
        setValue,
        type:nodePool.LET_STATEMENT,
    };
}