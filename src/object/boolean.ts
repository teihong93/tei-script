import objectPool from './objectPool';
import {TBoolean, TBooleanInput} from '../types/object/boolean';

/* 내장된 ES5 Boolean() 함수와 이름이 겹쳐 Bool 로 사용 */
export function Bool(input: TBooleanInput): TBoolean {

    let value = input.value;

    const inspect = () => `${value}`;
    const type = () => objectPool.BOOLEAN_OBJECT;

    return {
        inspect,
        type,
        value,
    };
}