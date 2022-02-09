import objectPool from './objectPool';
import {TNil} from '../types/object/nil';

/* 내장된 null 과 겹쳐 nil 로 표현 */
function Nil(): TNil {

    let value = null;

    const inspect = () => `nil`;
    const type = () => objectPool.NIL_OBJECT;

    return {
        inspect,
        type,
        value,
    };
}

export const NIL = Nil();