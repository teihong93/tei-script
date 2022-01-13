import {TExpression} from './expression';
import {Ttoken} from '../token';

export type TInfixExpressionInput = {
    token: Ttoken,
    operator: string,
    left:TExpression
    right?: TExpression
}

export type TInfixExpression = TInfixExpressionInput & TExpression