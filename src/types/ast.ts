import {Ttoken} from './token';

export interface INode {
    tokenLiteral: () => string;
}

export type TTokenBase = {
    token: Ttoken
}

/*  statement 인스턴스가 외부로 공개할 함수들 */
export type TStatement = INode & {
    statementNode: () => void,
    getStatement: () => TTokenBase & TLetStatementStateInput,
}

export type TLetStatementStateInput = {
    /* 변수 바인딩 식별자 */
    name: TIdentifier,
    /* 값을 생성하는 표현식 */
    value?: IExpression,
    token: Ttoken
}

/* type of identifier */
export type TIdentifierInput = {
    value: string,
    token:Ttoken
}

/*  Identifier 인스턴스가 외부로 공개할 함수들 */
export type TIdentifier =  INode & TTokenBase & {value: string}

/* type of expression */
export interface IExpression {
    node: INode,
    expressionNode: () => void
}

export type TProgramInput = {
    statements: TStatement[]
}

export type TProgram = TProgramInput & INode