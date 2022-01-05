import {TParserInput, TParser} from '../types/parser';
import {TProgram, TStatement} from '../types/ast';
import {Program} from '../ast/program';
import tokenPool from '../token/tokenPool';
import {LetStatement} from '../ast/letStatement';
import {Ttoken} from '../types/token';
import {createIdentifier} from '../ast/identifier';
import {Tlexer} from '../types/lexer';

export function Parser() {

    let lexer: Tlexer | undefined;    /* 렉서의 인스턴스 */
    let currentToken: Ttoken | undefined;        /* 현재 토큰 */
    let nextToken: Ttoken | undefined;        /* 다음 읽을 토큰 */
    let errors: string[] = [];        /* 파싱 에러 메시지 목록 */

    const init = (parserInput: TParserInput): TParser => {
        lexer = parserInput.lexer;

        // 토큰을 두개 읽어, 현재와 다음 토큰을 셋팅함.
        getNextToken();
        getNextToken();

        return {
            parseProgram,
            errors: () => [...(errors)],
        };
    };

    const getNextToken = () => {
        if (lexer === undefined) throw new Error('lexer 가 초기화되지 않음.');
        currentToken = nextToken;
        nextToken = lexer.nextToken();
    };

    const expectNext = (t: Ttoken['type']) => {
        if (nextTokenIs(t)) {
            getNextToken();
            return true;
        }
        nextTokenError(t);
        return false;
    };

    const currentTokenIs = (t: Ttoken['type']) => {
        return currentToken?.type === t;
    };

    const nextTokenIs = (t: Ttoken['type']) => {
        return nextToken?.type === t;
    };

    const parseStatement = (): TStatement | undefined => {
        switch (currentToken?.type) {
            case tokenPool.LET :
                return parseLetStatement();
            default:
                return;
        }
    };

    const nextTokenError = (expected: string) => {
        errors.push(`다음토큰은 ${expected} 를 예상했지만 ${nextToken?.type} 가 옴`);
    };

    /*
    * let a = 3; 같은 토큰을 파싱하기때문에, let 문 다음으로
    * a 와 같은 식별자가 와야 하고, 그다음 = 과 같은 대입문이 와야 한다.
    */
    const parseLetStatement = () => {
        if (!currentToken) return;

        let nowCurrentToken = currentToken;

        if (!expectNext(tokenPool.IDENT)) {
            return;
        }

        const identifier = createIdentifier(nowCurrentToken).init({
            value: nowCurrentToken.literal,
        });

        const statement = LetStatement(nowCurrentToken).init({
            name: identifier,
        });

        if (!expectNext(tokenPool.ASSIGN)) {
            return;
        }

        //TODO 세미콜론을 만날때 까지 표현식을 건너뛴다.
        while (!currentTokenIs(tokenPool.SEMICOLON)) {
            getNextToken();
        }
        return statement;
    };

    const parseProgram = (): TProgram => {
        if (currentToken === undefined || nextToken === undefined)
            throw new Error('토큰이 초기화되지 않음.');

        const program = Program({statements: []});

        while (currentToken.type != tokenPool.EOF) {
            const statement = parseStatement();
            if (statement) {
                program.statements = [...program.statements, statement];
            }
            getNextToken();
        }
        return program;
    };

    return {
        init,
    };
}
