import {getTokenLiteral} from './getTokenLiteral';
import {TPrefixExpression, TPrefixExpressionInput} from '../types/ast/prefixExpression';
import {TExpression} from '../types/ast/expression';

export function PrefixExpression(input: TPrefixExpressionInput): TPrefixExpression {

    const operator: string = input.operator;
    let right: TExpression | undefined = input.right;

    const expressionNode = () => {
    };

    const tokenLiteral = () => getTokenLiteral({token: input.token});

    const string = () => `(${input.operator}${input.right?.string()})`;

    return {
        tokenLiteral,
        string,
        token: input.token,
        operator,
        right, // right 는 set 을 외부에 공개
    };
}