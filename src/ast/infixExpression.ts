import {getTokenLiteral} from './getTokenLiteral';
import {TExpression} from '../types/ast/expression';
import {TInfixExpression, TInfixExpressionInput} from '../types/ast/infixExpression';
import {Ttoken} from '../types/token';

export function InfixExpression(input: TInfixExpressionInput): TInfixExpression {

    const operator: string = input.operator;
    let left: TExpression = input.left;
    let right: TExpression | undefined = input.right;
    let token:Ttoken = {...input.token}

    const string = () => `(${left.string()}${operator}${right?.string()})`;
    const insertToRight = (newRight: TExpression) => {
        right = newRight;
    };

    return {
        tokenLiteral:getTokenLiteral({token}),
        string,
        token,
        operator,
        getRight :()=> right,
        left,
        insertToRight,
    };
}