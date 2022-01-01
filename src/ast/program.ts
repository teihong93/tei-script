import {
    TProgramInput,
    TProgramOutput,
    TProgramState,
} from '../types/ast';

export function createProgram() {
    let programState: TProgramState = {
        statements: [],
    };

    const tokenLiteral = (): string => {
        if (programState.statements.length > 0) {
            return programState.statements[0].tokenLiteral();
        } else {
            return '';
        }
    };

    const init = (programInput: TProgramInput): TProgramOutput => {
        const {statements} = programInput;
        programState.statements = statements;
        return {
            tokenLiteral,
            statements: programState.statements,
        };
    };

    return {
        init,
    };
}


