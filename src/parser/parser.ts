import {TParser, TParserInput} from '../types/parser';
import {TStatement} from '../types/ast/ast';
import {Program} from '../ast/program';
import tokenPool from '../token/tokenPool';
import {LetStatement} from '../ast/letStatement';
import {Ttoken} from '../types/token';
import {Identifier} from '../ast/identifier';
import {Tlexer} from '../types/lexer';
import {ReturnStatement} from '../ast/returnStatement';
import {TProgram} from '../types/ast/program';
import {ParseFns} from './parseFns';
import {ExpressionStatement} from '../ast/expressionStatement';
import {Precedence, precedences} from './precedences';
import {TExpression} from '../types/ast/expression';
import {IntegerLiteral} from '../ast/integerLiteral';
import {PrefixExpression} from '../ast/prefixExpression';
import {InfixExpression} from '../ast/infixExpression';

export function Parser(parserInput: TParserInput): TParser {
    let lexer: Tlexer = parserInput.lexer;    /* 렉서의 인스턴스 */
    let currentToken: Ttoken | undefined;        /* 현재 토큰 */
    let nextToken: Ttoken | undefined;        /* 다음 읽을 토큰 */
    let errors: string[] = [];        /* 파싱 에러 메시지 목록 */

    /* 프랫파싱을위한 함수들 */
    const {getInfixParseFns, getPrefixParseFns, registerPrefix, registerInfix} = ParseFns();
    const {getPrecedences} = Precedence();

    const init = () => {
        // 토큰을 두개 읽어, 현재와 다음 토큰을 셋팅함.
        getNextToken();
        getNextToken();
        registerPrefix(tokenPool.IDENT, parseIdentifier); // 식별자 토큰 처리 함수 등록
        registerPrefix(tokenPool.INT, parseIntegerLiteral); // 정수 리터럴 토큰 처리 함수 등록
        registerPrefix(tokenPool.BANG, parsePrefixExpression); // !전위연산자 처리 함수 등록
        registerPrefix(tokenPool.MINUS, parsePrefixExpression); // -전위연산자 처리 함수 등록

        registerInfix(tokenPool.PLUS, parseInfixExpression); // + 중위연산자 처리 함수 등록
        registerInfix(tokenPool.MINUS, parseInfixExpression); // - 중위연산자 처리 함수 등록
        registerInfix(tokenPool.SLASH, parseInfixExpression); // / 중위연산자 처리 함수 등록
        registerInfix(tokenPool.ASTERISK, parseInfixExpression); // * 중위연산자 처리 함수 등록
        registerInfix(tokenPool.EQ, parseInfixExpression); // = 중위연산자 처리 함수 등록
        registerInfix(tokenPool.NOT_EQ, parseInfixExpression); // != 중위연산자 처리 함수 등록
        registerInfix(tokenPool.LT, parseInfixExpression); // < 중위연산자 처리 함수 등록
        registerInfix(tokenPool.GT, parseInfixExpression); // > 중위연산자 처리 함수 등록
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
            case tokenPool.RETURN :
                return parseReturnStatement();
            default:
                return parseExpressionStatement();
        }
    };

    const nextTokenError = (expected: string) => {
        errors.push(`다음토큰은 ${expected} 를 예상했지만 ${nextToken?.type} 가 옴`);
    };

    const noPrefixParseFnError = (tokenType: Ttoken['type']) => {
        errors.push(`${tokenType} 를 위한 prefix 함수가 존재하지 않음`);
    };

    /*
    * let a = 3; 같은 토큰을 파싱하기때문에, let 문 다음으로
    * a 와 같은 식별자가 와야 하고, 그다음 = 과 같은 대입문이 와야 한다.
    */
    const parseLetStatement = () => {
        if (!currentToken) return;

        let nowCurrentToken = currentToken;

        if (!expectNext(tokenPool.IDENT)) return;

        const identifier = Identifier({
            token: nowCurrentToken,
            value: nowCurrentToken.literal,
        });

        const statement = LetStatement({
            token: nowCurrentToken,
            name: identifier,
        });

        if (!expectNext(tokenPool.ASSIGN)) return;

        //TODO 세미콜론을 만날때 까지 표현식을 건너뛴다.
        while (!currentTokenIs(tokenPool.SEMICOLON)) {
            getNextToken();
        }
        return statement;
    };

    const parseReturnStatement = () => {
        if (!currentToken) return;

        const statememt = ReturnStatement({token: currentToken});
        getNextToken();

        while (!currentTokenIs(tokenPool.SEMICOLON)) {
            getNextToken();
        }
        return statememt;
    };

    const parseExpressionStatement = () => {
        if (!currentToken) return;

        const statement = ExpressionStatement({
            token: currentToken,
            expression: parseExpression(precedences.LOWEST),
        });

        if (nextTokenIs(tokenPool.SEMICOLON)) {
            getNextToken();
        }

        return statement;
    };

    const parseExpression = (precedence: precedences): TExpression | undefined => {
        if (!currentToken || !nextToken) return;

        const prefix = getPrefixParseFns(currentToken.type);
        if (!prefix) {
            noPrefixParseFnError(currentToken.type);
            return;
        }

        let leftExpression: TExpression = prefix();

        while (!nextTokenIs(tokenPool.SEMICOLON) && precedence < getPrecedences(nextToken.type)) {
            const infix = getInfixParseFns(nextToken.type);
            if (!infix) {
                return leftExpression;
            }
            getNextToken();
            leftExpression = infix(leftExpression);
        }

        return leftExpression;
    };

    const parseIdentifier = (): TExpression => {
        if (!currentToken) throw new Error('토큰이 초기화되지 않음.');
        return Identifier({token: currentToken, value: currentToken.literal});
    };

    const parseIntegerLiteral = (): TExpression => {
        if (!currentToken) throw new Error('토큰이 초기화되지 않음.');
        const literalNumber = parseInt(currentToken.literal);
        return IntegerLiteral({token: currentToken, value: literalNumber});
    };

    const parsePrefixExpression = (): TExpression => {
        if (!currentToken) throw new Error('토큰이 초기화되지 않음.');
        const expression = PrefixExpression({
            token: currentToken,
            operator: currentToken.literal,
        });

        getNextToken();

        expression.insertToRight(parseExpression(precedences.PREFIX) as TExpression)
        return expression;
    };

    const parseInfixExpression = (left: TExpression): TExpression => {
        if (!currentToken) throw new Error('토큰이 초기화되지 않음.');
        const expression = InfixExpression({
            token: currentToken,
            operator: currentToken.literal,
            left: left,
        });

        const currentPrecedence = getPrecedences(currentToken.type);
        getNextToken();

        expression.insertToRight(parseExpression(currentPrecedence) as TExpression)
        return expression;
    };

    const parseProgram = (): TProgram => {
        if (currentToken === undefined || nextToken === undefined)
            throw new Error('토큰이 초기화되지 않음.');

        const program = Program({statements: []});

        while (currentToken.type != tokenPool.EOF) {
            const statement = parseStatement();
            if (statement) {
                program.addToStatement(statement)
            }
            getNextToken();
        }
        return program;
    };

    init();
    return {
        parseProgram,
        errors: () => [...(errors)],
    };
}
