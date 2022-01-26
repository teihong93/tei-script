import {Ttoken} from '../token';
import {TExpression} from './expression';

export type TBoolInput = {
    token: Ttoken,
    value: boolean
}

export type TBool = TBoolInput & TExpression