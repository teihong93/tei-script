import {getTokenLiteral} from './getTokenLiteral';
import {TPrefixExpression, TPrefixExpressionInput} from '../types/ast/prefixExpression';
import {TExpression} from '../types/ast/expression';
import {Ttoken} from '../types/token';
import nodePool from './nodePool';

export function PrefixExpression(input: TPrefixExpressionInput): TPrefixExpression {

    const operator: string = input.operator;
    let right: TExpression | undefined = input.right;
    let token: Ttoken = {...input.token};

    const string = () => {
        return `(${operator}${right?.string()})`;
    };

    const insertToRight = (newRight: TExpression): void => {
        right = newRight;
    };

    return {
        tokenLiteral: getTokenLiteral({token}),
        string,
        token,
        operator,
        insertToRight,
        getRight: () => right,
        type:nodePool.PREFIX_EXPRESSION,
    };
}