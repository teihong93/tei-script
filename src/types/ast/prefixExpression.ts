import {TExpression} from './expression';
import {Ttoken} from '../token';

export type TPrefixExpressionInput = {
    token: Ttoken,
    /* prefix 연산자, - 나 ! 등 */
    operator: string,
    /* 연산자의 오른쪽 노드 !a 라면 a */
    right?: TExpression
}

export type TPrefixExpression = TPrefixExpressionInput & TExpression & {
    insertToRight:(exp:TExpression)=>void
    getRight:()=>TExpression|undefined,
}