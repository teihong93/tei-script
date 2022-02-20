import {TError} from '../types/object/error';
import {Error} from '../object/error';

export function createError(errType: string, ...args: string[]): TError {
    const argsToString = () => args.reduce((acc, e) => acc + ` ${e}`, '');
    return Error({message: `${errType}:${argsToString()}`});
}