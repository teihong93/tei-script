import objectPool from './objectPool';
import {TError, TErrorInput} from '../types/object/error';
import {TObject} from '../types/object/object';

export function Error(input: TErrorInput): TError {

    let message = input.message;

    const inspect = () => `ERROR: ${message}`;
    const type = () => objectPool.ERROR_OBJECT;

    return {
        inspect,
        type,
        message,
    };
}

export const isError = (obj: TObject): boolean => {
    if (obj) {
        return obj.type() === objectPool.ERROR_OBJECT;
    }
    return false;
};

export const ErrorMsgPool = {
    'TYPE_MISMATCH': '타입이 일치하지 않습니다',
    'UNKNOWN_OPERATOR': '지원하지 않는 연산자입니다',
};