import {TProgramState} from '../types/ast';

export function createProgram() {
    let statementsState: TProgramState;

    const tokenLiteral = (): string => {
        if (statementsState.statements.length > 0) {
            return statementsState.statements[0].node.tokenLiteral();
        } else {
            return '';
        }
    };

}