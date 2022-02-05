import objectPool from './objectPool';
import {TBoolean, TBooleanInput} from '../types/object/boolean';
import {TNil, TNilInput} from '../types/object/nil';

/* 내장된 ES5 Boolean() 함수와 이름이 겹쳐 Bool 로 사용 */
export function Nil(): TNil {

    let value = null;

    const inspect = () => `nil`;
    const type = () => objectPool.NIL_OBJECT;

    return {
        inspect,
        type,
        value,
    };
}