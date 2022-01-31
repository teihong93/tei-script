import {Ttoken} from '../token';
import {TExpression} from './expression';
import {TIdentifier} from './identifier';
import {TBlockStatement} from './blockStatement';

export type TFunctionExpressionInput = {
    /* 'function' 토큰 */
    token: Ttoken,
}

export type TFunctionExpression = TFunctionExpressionInput & TExpression & {
    /* (인자1,인자2) */
    getParameters: () => TIdentifier[]
    /* { 안의 식 } */
    getBody: () => TBlockStatement
    /* (인자1,인자2) */
    setParameters: (param: TIdentifier[]) => void
    /* { 안의 식 } */
    setBody: (body: TBlockStatement) => void
}