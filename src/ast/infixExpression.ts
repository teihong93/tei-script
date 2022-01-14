import {getTokenLiteral} from './getTokenLiteral';
import {TExpression} from '../types/ast/expression';
import {TInfixExpression, TInfixExpressionInput} from '../types/ast/infixExpression';

export function InfixExpression(input: TInfixExpressionInput): TInfixExpression {

    const operator: string = input.operator;
    let left: TExpression = input.left;
    let right: TExpression | undefined = input.right;

    const tokenLiteral = () => getTokenLiteral({token: input.token});
    const string = () => `(${left.string()}${operator}${right?.string()})`;
    const insertToRight = (newRight: TExpression) => {
        right = newRight;
    };

    return {
        tokenLiteral,
        string,
        token: input.token,
        operator,
        getRight :()=> right,
        left,
        insertToRight,
    };
}