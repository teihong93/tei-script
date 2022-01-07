/* type of identifier */
import {Ttoken} from '../token';
import {INode, TTokenBase} from './ast';

export type TIdentifierInput = {
    value: string,
    token: Ttoken
}
/*  Identifier 인스턴스가 외부로 공개할 함수들 */
export type TIdentifier = INode & TTokenBase & {value: string}