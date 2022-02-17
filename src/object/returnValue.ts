import objectPool from './objectPool';
import {TReturnValue, TReturnValueInput} from '../types/object/returnValue';

export function ReturnValue(input: TReturnValueInput): TReturnValue {

    let value = input.value;

    const inspect = () => `${value.inspect()}`;
    const type = () => objectPool.RETURN_VALUE_OBJECT;

    return {
        inspect,
        type,
        value,
    };
}