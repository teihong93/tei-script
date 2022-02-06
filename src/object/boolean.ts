import objectPool from './objectPool';
import {TBoolean, TBooleanInput} from '../types/object/boolean';

function Boolean(input: TBooleanInput): TBoolean {

    let value = input.value;

    const inspect = () => `${value}`;
    const type = () => objectPool.BOOLEAN_OBJECT;

    return {
        inspect,
        type,
        value,
    };
}

/* boolean 객체는 여러개 존재할 필요가 없어서, 메모리에서 하나만 만들어서 레퍼런스만 주도록.*/
export const TRUE_BOOLEAN = Boolean({value: true});
export const FALSE_BOOLEAN = Boolean({value: false});