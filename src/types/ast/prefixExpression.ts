import {TExpression} from './expression';
import {Ttoken} from '../token';

export type TPrefixExpressionInput = {
    token: Ttoken,
    operator: string,
    right?: TExpression
}

export type TPrefixExpression = TPrefixExpressionInput & TExpression