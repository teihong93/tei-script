import {Ttoken} from '../token';
import {TStatement} from './ast';
import {TExpression} from './expression';

export type TReturnStatementInput = {
    token: Ttoken
}
/*  returnStatement 인스턴스가 외부로 공개할 함수들 */
export type TReturnStatement = TStatement & {
    token: Ttoken,
    returnValue?: TExpression
}