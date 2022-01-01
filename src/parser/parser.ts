import {TParserInput, TParserOutput, TParserState} from '../types/parser';
import {TProgramOutput, TStatementOutput} from '../types/ast';
import {createProgram} from '../ast/program';
import tokenPool from '../token/tokenPool';

export function createParser() {
    let parserState: TParserState = {
        lexer: undefined,
        currentToken: undefined,
        nextToken: undefined,
    };

    const init = (parserInput: TParserInput): TParserOutput => {
        const {lexer} = parserInput;
        parserState.lexer = lexer;

        // 토큰을 두개 읽어, 현재와 다음 토큰을 셋팅함.
        nextToken();
        nextToken();

        return {
            parseProgram,
        };
    };

    const nextToken = () => {
        if (parserState.lexer === undefined) throw new Error('lexer 가 초기화되지 않음.');
        parserState.currentToken = parserState.nextToken;
        parserState.nextToken = parserState.lexer.nextToken();
    };

    const parseStatement = (): TStatementOutput | undefined => {
        switch (parserState.currentToken?.type) {
            case tokenPool.LET :
                return parseStatement();
            default:
                return;
        }
    };

    const parseProgram = (): TProgramOutput => {
        if (parserState.currentToken === undefined || parserState.nextToken === undefined)
            throw new Error('토큰이 초기화되지 않음.');

        const program = createProgram().init({statements: []});

        while (parserState.currentToken.type != tokenPool.EOF) {
            const statement = parseStatement();
            if (statement) {
                program.statements = [...program.statements, statement];
            }
            nextToken();
        }

        return program;
    };

    return {
        init,
    };
}
