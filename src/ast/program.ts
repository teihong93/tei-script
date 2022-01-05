import {
    TProgramInput,
    TProgram,
    TStatement,
} from '../types/ast';

export function Program() {

    let statements: TStatement[] = [];

    const tokenLiteral = (): string => {
        if (statements.length > 0) {
            return statements[0].tokenLiteral();
        } else {
            return '';
        }
    };

    const init = (programInput: TProgramInput): TProgram => {
        statements = programInput.statements;
        return {
            tokenLiteral,
            statements: statements,
        };
    };

    return {
        init,
    };
}


