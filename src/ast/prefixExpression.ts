import {getTokenLiteral} from './getTokenLiteral';
import {TPrefixExpression, TPrefixExpressionInput} from '../types/ast/prefixExpression';
import {TExpression} from '../types/ast/expression';

export function PrefixExpression(input: TPrefixExpressionInput): TPrefixExpression {

    const operator: string = input.operator;
    let right: TExpression | undefined = input.right;

    const tokenLiteral = () => getTokenLiteral({token: input.token});
    const string = () => {
        return `(${operator}${right?.string()})`;
    };

    const insertToRight = (newRight: TExpression): void => {
        right = newRight;
    };

    return {
        tokenLiteral,
        string,
        token: input.token,
        operator,
        insertToRight,
        getRight: () => right,
    };
}