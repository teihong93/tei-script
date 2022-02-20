import {TObject} from '../types/object/object';
import {NIL} from '../object/nil';
import {FALSE_BOOLEAN, TRUE_BOOLEAN} from '../object/boolean';
import objectPool from '../object/objectPool';
import {TInteger} from '../types/object/integer';
import {Integer} from '../object/interger';
import {createError} from './createError';
import {ErrorMsgPool} from '../object/error';
import tokenPool from '../token/tokenPool';

export function evalPrefixExpression(operator: string, right: TObject): TObject {
    switch (operator) {
        case '!':
            return evalBangPrefixOperatorExpression(right);
        case '-':
            return evalMinusPrefixOperatorExpression(right);
        default:
            return createError(ErrorMsgPool.UNKNOWN_OPERATOR, operator, right.type());
    }
}

function evalBangPrefixOperatorExpression(right: TObject): TObject {
    switch (right) {
        case TRUE_BOOLEAN:
            return FALSE_BOOLEAN;
        case FALSE_BOOLEAN:
            return TRUE_BOOLEAN;
        case NIL:
            return TRUE_BOOLEAN;
        default:
            return FALSE_BOOLEAN;
    }
}

function evalMinusPrefixOperatorExpression(right: TObject): TObject {
    if (right.type() != objectPool.INTEGER_OBJECT) {
        return createError(ErrorMsgPool.UNKNOWN_OPERATOR, tokenPool.MINUS, right.type());
    }
    const value = (right as TInteger).value;
    return Integer({value: -value});
}