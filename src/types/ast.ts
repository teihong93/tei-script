export interface INode {
    tokenLiteral: () => string;
}

export interface IStatement {
    node: INode,
    statementNode: () => void
}

export interface IExpression {
    node: INode,
    expressionNode: () => void
}

export type TLetStatement = {
    // Token
}

export type TProgramState = {
    statements: IStatement[],
}