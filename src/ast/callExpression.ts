import {getTokenLiteral} from './getTokenLiteral';
import {TIdentifier} from '../types/ast/identifier';
import {TBlockStatement} from '../types/ast/blockStatement';
import {TCallExpression, TCallExpressionInput} from '../types/ast/callExpression';
import {TExpression} from '../types/ast/expression';
import nodePool from './nodePool';

export function CallExpression(input: TCallExpressionInput): TCallExpression {

    let token = {...input.token};
    let argument: TExpression[] = input.argument;
    let func: TExpression = input.func;

    const tokenLiteral = getTokenLiteral({token});
    const string = () => {
        const args = argument.map((e) => e.string());
        return `${func.string()}(${args.join(',')})`;
    };

    return {
        tokenLiteral,
        string,
        token,
        argument,
        func,
        type:nodePool.CALL_EXPRESSION,
    };
}