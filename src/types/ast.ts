import {Ttoken} from './token';

export interface INode {
    tokenLiteral: () => string;
}

export type TTokenBase = {
    token: Ttoken
}

/*  statement 인스턴스가 외부로 공개할 함수들 */
export type TStatementOutput = INode & {
    statementNode: () => void,
    getStatement: () => TLetStatementState,
}

/* let statement */

export type TLetStatementStateInput = {
    /* 변수 바인딩 식별자 */
    name: TIdentifierOutput,
    /* 값을 생성하는 표현식 */
    value?: IExpression
}

export type TLetStatementState = TTokenBase & {
    /* 변수 바인딩 식별자 */
    name: TIdentifierOutput | undefined,
    /* 값을 생성하는 표현식 */
    value: IExpression | undefined
}

/* type of identifier */
export type TIdentifierInput = {
    value: string,
}

/* type of identifier */
export type TIdentifierState = TTokenBase & {
    value: string | undefined,
}

/*  Identifier 인스턴스가 외부로 공개할 함수들 */
export type TIdentifierOutput = TIdentifierState & INode & {/*not yet*/}

/* type of expression */
export interface IExpression {
    node: INode,
    expressionNode: () => void
}

export type TExpressionOutput = INode & {
    expressionNode: () => void,
}


export type TProgramInput = {
    statements: TStatementOutput[]
}

export type TProgramState = {
    statements: TStatementOutput[],
}

export type TProgramOutput = TProgramState & INode & {}