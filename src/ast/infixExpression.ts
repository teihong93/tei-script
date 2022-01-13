import {getTokenLiteral} from './getTokenLiteral';
import {TPrefixExpression, TPrefixExpressionInput} from '../types/ast/prefixExpression';
import {TExpression} from '../types/ast/expression';
import {TInfixExpression, TInfixExpressionInput} from '../types/ast/infixExpression';

export function InfixExpression(input: TInfixExpressionInput): TInfixExpression {

    const operator: string = input.operator;
    let left: TExpression  = input.left;
    let right: TExpression | undefined = input.right;

    const tokenLiteral = () => getTokenLiteral({token: input.token});
    const string = () => `(${input.left?.string()}${input.operator}${input.right?.string()})`;

    return {
        tokenLiteral,
        string,
        token: input.token,
        operator,
        right, // right 는 set 을 외부에 공개
        left
    };
}