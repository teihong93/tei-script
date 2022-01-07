import {Ttoken} from '../token';

export interface INode {
    tokenLiteral: () => string;
}

export type TTokenBase = {
    token: Ttoken
}

/*  statement 인스턴스가 외부로 공개할 함수들 */
export type TStatement = INode & {
    statementNode: () => void,
}


