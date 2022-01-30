import {Ttoken} from '../token';
import {TStatement} from './ast';

export type TBlockStatementInput = {
    token: Ttoken,
    statements: TStatement[]
}

export type TBlockStatement = TStatement & TBlockStatementInput