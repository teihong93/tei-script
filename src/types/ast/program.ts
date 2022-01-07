import {INode, TStatement} from './ast';

export type TProgramInput = {
    statements: TStatement[]
}
export type TProgram = TProgramInput & INode