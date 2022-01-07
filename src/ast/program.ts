import {
    TStatement,
} from '../types/ast/ast';
import {TProgram, TProgramInput} from '../types/ast/program';

export function Program(programInput: TProgramInput): TProgram {
    let statements = programInput.statements;

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


