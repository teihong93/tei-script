import {Ttoken} from '../token';
import {TExpression} from './expression';
import {TIdentifier} from './identifier';
import {TBlockStatement} from './blockStatement';

export type TCallExpressionInput = {
    /* '(' 여는괄호 토큰 */
    token: Ttoken,
    func: TExpression // 식별자 혹은 함수 리터럴
    argument: TExpression[]
}

export type TCallExpression = TExpression & TCallExpressionInput;