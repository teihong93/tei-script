import {TObject} from '../types/object/object';
import {TInteger} from '../types/object/integer';
import {Integer} from '../object/interger';
import {NIL} from '../object/nil';
import {isEqual} from '../util/arrayHelper';
import objectPool from '../object/objectPool';
import {getReferenceBoolean} from './evaluator';

export function evalInfixExpression(operator: string, left: TObject, right: TObject): TObject {
    if ([left.type(), right.type()].every(isEqual(objectPool.INTEGER_OBJECT))) {
        return evalIntegerInfixExpression(operator, left, right);
    }
    if ([left.type(), right.type()].every(isEqual(objectPool.BOOLEAN_OBJECT))) {
        return evalBoolInfixExpression(operator, left, right);
    }
    return NIL;
}

function evalIntegerInfixExpression(operator: string, left: TObject, right: TObject): TObject {
    const leftValue = (left as TInteger).value;
    const rightValue = (right as TInteger).value;

    switch (operator) {
        case '+':
            return Integer({value: leftValue + rightValue});
        case '-':
            return Integer({value: leftValue - rightValue});
        case '*':
            return Integer({value: leftValue * rightValue});
        case '/':
            return Integer({value: leftValue / rightValue});
        case '<':
            return getReferenceBoolean(leftValue < rightValue);
        case '>':
            return getReferenceBoolean(leftValue > rightValue);
        case '==':
            return getReferenceBoolean(leftValue === rightValue);
        case '!=':
            return getReferenceBoolean(leftValue !== rightValue);
        default:
            return NIL;
    }
}

function evalBoolInfixExpression(operator: string, left: TObject, right: TObject): TObject {
    /* BOOL 객체들은 같은 참조를 가지고 있어서, 객체 참조만 비교해도 된다*/
    switch (operator) {
        case '==':
            return getReferenceBoolean(left === right);
        case '!=':
            return getReferenceBoolean(left !== right);
        default:
            return NIL;
    }
}