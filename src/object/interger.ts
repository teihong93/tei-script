import {TInteger, TIntegerInput} from '../types/object/integer';
import objectPool from './objectPool';

export function Integer(input: TIntegerInput): TInteger {

    let value = input.value;

    const inspect = () => `${value}`;
    const type = () => objectPool.INTEGER_OBJECT;

    return {
        inspect,
        type,
        value,
    };
}