import {TExpression} from './expression';
import {Ttoken} from '../token';
import {TBlockStatement} from './blockStatement';

export type TIfExpressionInput = {
    token: Ttoken
}

export type TIfExpression = TIfExpressionInput & TExpression & {
    /* 조건문 컨디션, if ($condition) */
    getCondition: () => TExpression
    /* 조건이 참일때            거짓일 때
    { $consequence } else { $alternative }  */
    getConsequence: () => TBlockStatement | undefined
    getAlternative: () => TBlockStatement | undefined
    setCondition: (exp: TExpression) => void,
    setConsequence: (block: TBlockStatement) => void,
    setAlternative: (block: TBlockStatement) => void
}