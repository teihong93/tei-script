import {TExpression} from './expression';
import {Ttoken} from '../token';

export type TInfixExpressionInput = {
    token: Ttoken,
    /* 중위 연산자, + - * 등 */
    operator: string,
    /* 연사자의 왼쪽 식 */
    left: TExpression
    /* 연산자의 오른쪽 식 */
    right?: TExpression
}

export type TInfixExpression = TInfixExpressionInput & TExpression & {
    insertToRight: (exp: TExpression) => void,
    getRight: () => TExpression | undefined,
}