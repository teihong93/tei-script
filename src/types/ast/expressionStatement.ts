import {INode, TStatement, TTokenBase} from './ast';
import {TExpression} from './expression';

export type TExpressionStatementInput = TTokenBase & {
    expression?: TExpression
}
export type TExpressionStatement = TStatement & TExpressionStatementInput