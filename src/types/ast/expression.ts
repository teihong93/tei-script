/* type of expression */
import {INode} from './ast';

export type TExpression = {
    node: INode,
    expressionNode: () => void
}