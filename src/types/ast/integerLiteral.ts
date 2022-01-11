import { TTokenBase} from './ast';
import {TExpression} from './expression';

export type TIntegerLiteralInput = TTokenBase & {
    value: number,
}

/*  Identifier 인스턴스가 외부로 공개할 함수들 */
export type TIntegerLiteral = TExpression & TIntegerLiteralInput