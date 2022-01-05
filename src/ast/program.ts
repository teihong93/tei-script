import {
    TProgramInput,
    TProgram,
    TStatement,
} from '../types/ast';

export function Program(programInput: TProgramInput): TProgram {
    let statements: TStatement[] = programInput.statements;

    const tokenLiteral = (): string => {
        if (statements.length > 0) {
            return statements[0].tokenLiteral();
        } else {
            return '';
        }
    };

    return {
        tokenLiteral,
        statements: statements,
    };
}


