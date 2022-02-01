import {Ttoken} from '../token';
import {TStatement} from './ast';
import {TIdentifier} from './identifier';
import {TExpression} from './expression';

export type TLetStatementInput = {
    token: Ttoken
}

export type TLetStatement = TStatement & {
    /* 변수 바인딩 식별자 */
    getName: () => TIdentifier,
    setName: (name: TIdentifier) => void,
    /* 값을 생성하는 표현식 */
    getValue: () => TExpression,
    setValue: (value: TExpression) => void,

}