import {TParserInput, TParserOutput, TParserState} from '../types/parser';
import {TProgramOutput, TStatementOutput, TTokenBase} from '../types/ast';
import {createProgram} from '../ast/program';
import tokenPool from '../token/tokenPool';
import {createLetStatement} from '../ast/letStatement';
import {Ttoken} from '../types/token';
import {createIdentifier} from '../ast/identifier';

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

    const expectNext = (t: Ttoken['type']) => {
        if (nextTokenIs(t)) {
            nextToken();
            return true;
        }
        return false;
    };

    const currentTokenIs = (t: Ttoken['type']) => {
        return parserState.currentToken?.type === t;
    };

    const nextTokenIs = (t: Ttoken['type']) => {
        return parserState.nextToken?.type === t;
    };

    const parseStatement = (): TStatementOutput | undefined => {
        switch (parserState.currentToken?.type) {
            case tokenPool.LET :
                return parseLetStatement();
            default:
                return;
        }
    };

    /*
    * let a = 3; 같은 토큰을 파싱하기때문에, let 문 다음으로
    * a 와 같은 식별자가 와야 하고, 그다음 = 과 같은 대입문이 와야 한다.
    */
    const parseLetStatement = () => {
        if (!parserState.currentToken) return;
        const {currentToken} = parserState;

        if (!expectNext(tokenPool.IDENT)) {
            return;
        }

        const identifier = createIdentifier(currentToken).init({
            value: currentToken.literal,
        });

        const statement = createLetStatement(currentToken).init({
            name: identifier,
        });

        if (!expectNext(tokenPool.ASSIGN)) {
            return;
        }

        //TODO 세미콜론을 만날때 까지 표현식을 건너뛴다.
        while (!currentTokenIs(tokenPool.SEMICOLON)) {
            nextToken();
        }
        return statement;
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
