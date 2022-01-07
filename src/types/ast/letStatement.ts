import {Ttoken} from '../token';
import {TStatement} from './ast';
import {TIdentifier} from './identifier';
import {TExpression} from './expression';

export type TLetStatementInput = {
    /* 변수 바인딩 식별자 */
    name: TIdentifier,
    /* 값을 생성하는 표현식 */
    value?: TExpression,
    token: Ttoken
}

export type TLetStatement = TStatement & TLetStatementInput