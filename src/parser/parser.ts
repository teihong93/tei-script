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
import {Bool} from '../ast/bool';
import {IfExpression} from '../ast/ifExpression';
import {TBlockStatement} from '../types/ast/blockStatement';
import {BlockStatement} from '../ast/blockStatement';
import {FunctionExpression} from '../ast/functionExpression';
import {TIdentifier} from '../types/ast/identifier';
import {CallExpression} from '../ast/callExpression';

export function Parser(parserInput: TParserInput): TParser {
    let lexer: Tlexer = parserInput.lexer;    /* 렉서의 인스턴스 */
    let currentToken: Ttoken;        /* 현재 토큰 */
    let nextToken: Ttoken;        /* 다음 읽을 토큰 */
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
        registerPrefix(tokenPool.TRUE, parseBool); // Bool 토큰 처리 함수 등록
        registerPrefix(tokenPool.FALSE, parseBool); // Bool 토큰 처리 함수 등록

        registerPrefix(tokenPool.IF, parseIfExpression); // IF 토큰 처리 함수 등록
        registerPrefix(tokenPool.FUNCTION, parseFunctionExpression); // FUNCTION 토큰 처리 함수 등록

        registerPrefix(tokenPool.LPAREN, parseGroupedExpression); // ( 토큰 처리 함수 등록

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

        /*
        * 함수 call 시 ( 토큰은 함수 와 인자 사이의 중위 연산자로 동작한다. add(2,3) 일 경우, <add> 와 <인자[2,3]> 사이의
        * 중위 연산자로 파싱되어야 한다.
        */
        registerInfix(tokenPool.LPAREN, parseCallExpression);

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
        return currentToken.type === t;
    };

    const nextTokenIs = (t: Ttoken['type']) => {
        return nextToken.type === t;
    };

    const parseStatement = (): TStatement | undefined => {
        switch (currentToken.type) {
            case tokenPool.LET :
                return parseLetStatement();
            case tokenPool.RETURN :
                return parseReturnStatement();
            default:
                return parseExpressionStatement();
        }
    };

    const nextTokenError = (expected: string) => {
        errors.push(`다음토큰은 ${expected} 를 예상했지만 ${nextToken.type} 가 옴`);
    };

    const noPrefixParseFnError = (tokenType: Ttoken['type']) => {
        errors.push(`${tokenType} 를 위한 prefix 함수가 존재하지 않음`);
    };

    /*
    * let a = 3; 같은 토큰을 파싱하기때문에, let 문 다음으로
    * a 와 같은 식별자가 와야 하고, 그다음 = 과 같은 대입문이 와야 한다.
    */
    const parseLetStatement = () => {
        let nowCurrentToken = currentToken;
        if (!expectNext(tokenPool.IDENT)) return;

        const identifier = Identifier({
            token: nowCurrentToken,
            value: nowCurrentToken.literal,
        });

        const statement = LetStatement({
            token: nowCurrentToken,
        });

        statement.setName(identifier);
        if (!expectNext(tokenPool.ASSIGN)) return;

        getNextToken();
        statement.setValue(parseExpression(precedences.LOWEST) as TExpression);

        if (nextTokenIs(tokenPool.SEMICOLON)) {
            getNextToken();
        }

        return statement;
    };

    const parseReturnStatement = () => {
        const statement = ReturnStatement({token: currentToken});
        getNextToken();
        const returnValue = parseExpression(precedences.LOWEST);
        statement.setReturnValue(returnValue as TExpression);

        if (nextTokenIs(tokenPool.SEMICOLON)) {
            getNextToken();
        }
        return statement;
    };

    const parseExpressionStatement = () => {
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

        const prefix = getPrefixParseFns(currentToken.type);
        if (!prefix) {
            noPrefixParseFnError(currentToken.type);
            return;
        }

        let leftExpression = prefix();

        while (!nextTokenIs(tokenPool.SEMICOLON) && precedence < getPrecedences(nextToken.type)) {
            const infix = getInfixParseFns(nextToken.type);
            if (!infix) {
                return leftExpression;
            }
            getNextToken();
            leftExpression = infix(leftExpression as TExpression);
        }

        return leftExpression;
    };

    const parseIdentifier = (): TExpression => {
        return Identifier({token: currentToken, value: currentToken.literal});
    };

    const parseIntegerLiteral = (): TExpression => {
        const literalNumber = parseInt(currentToken.literal);
        return IntegerLiteral({token: currentToken, value: literalNumber});
    };

    const parseBool = (): TExpression => {
        return Bool({token: currentToken, value: currentTokenIs(tokenPool.TRUE)});
    };

    const parseGroupedExpression = (): TExpression | undefined => {
        getNextToken();
        const expression = parseExpression(precedences.LOWEST);

        if (!expectNext(tokenPool.RPAREN)) {
            return;
        }
        return expression;
    };

    const parsePrefixExpression = (): TExpression => {
        const expression = PrefixExpression({
            token: currentToken,
            operator: currentToken.literal,
        });

        getNextToken();

        expression.insertToRight(parseExpression(precedences.PREFIX) as TExpression);
        return expression;
    };

    const parseInfixExpression = (left: TExpression): TExpression => {
        const expression = InfixExpression({
            token: currentToken,
            operator: currentToken.literal,
            left: left,
        });

        const currentPrecedence = getPrecedences(currentToken.type);
        getNextToken();

        expression.setRight(parseExpression(currentPrecedence) as TExpression);
        return expression;
    };

    const parseIfExpression = (): TExpression | undefined => {
        const expression = IfExpression({token: currentToken});
        if (!expectNext(tokenPool.LPAREN)) {
            return;
        }
        getNextToken();
        expression.setCondition(parseExpression(precedences.LOWEST) as TExpression);
        if (!expectNext(tokenPool.RPAREN)) {
            return;
        }
        if (!expectNext(tokenPool.LBRACE)) {
            return;
        }
        expression.setConsequence(parseBlockStatement());

        // 만일, ELSE 문이 추가로 존재한다면 추가로 파싱
        if (nextTokenIs(tokenPool.ELSE)) {
            getNextToken();
            if (!expectNext(tokenPool.LBRACE)) {
                return;
            }
            expression.setAlternative(parseBlockStatement());
        }
        return expression;
    };

    const parseBlockStatement = (): TBlockStatement => {
        const block = BlockStatement({
            token: currentToken,
            statements: [],
        });

        getNextToken();

        while (!currentTokenIs(tokenPool.RBRACE) && !currentTokenIs(tokenPool.EOF)) {
            const statement = parseStatement();
            if (statement) {
                block.statements.push(statement);
            }
            getNextToken();
        }
        return block;
    };

    const parseFunctionExpression = (): TExpression | undefined => {
        const literal = FunctionExpression({
            token: currentToken,
        });
        if (!expectNext(tokenPool.LPAREN)) {
            return;
        }

        literal.setParameters(parseFunctionParameters() as TIdentifier[]);

        if (!expectNext(tokenPool.LBRACE)) {
            return;
        }

        literal.setBody(parseBlockStatement());
        return literal;
    };

    const parseFunctionParameters = (): TIdentifier[] | undefined => {
        const identifiers: TIdentifier[] = [];
        if (nextTokenIs(tokenPool.RPAREN)) {
            getNextToken();
            return identifiers;
        }
        getNextToken();

        const ident = Identifier({
            token: currentToken,
            value: currentToken.literal,
        });

        identifiers.push(ident);

        while (nextTokenIs(tokenPool.COMMA)) {
            getNextToken();
            getNextToken();
            const _ident = Identifier({
                token: currentToken,
                value: currentToken.literal,
            });
            identifiers.push(_ident);
        }

        if (!expectNext(tokenPool.RPAREN)) {
            return;
        }

        return identifiers;
    };

    const parseCallExpression = (func: TExpression): TExpression => {
        const expression = CallExpression({
            token: currentToken,
            func: func,
            argument: parseCallArguments() as TExpression[],
        });
        return expression;
    };

    const parseCallArguments = (): TExpression[] | undefined => {
        const pushArgIfExists = (argsArray: TExpression[]) => {
            const arg = parseExpression(precedences.LOWEST);
            if (arg) argsArray.push(arg);
        };

        const args: TExpression[] = [];
        if (nextTokenIs(tokenPool.RPAREN)) {
            getNextToken();
            return args;
        }
        getNextToken();
        pushArgIfExists(args);

        while (nextTokenIs(tokenPool.COMMA)) {
            getNextToken();
            getNextToken();
            pushArgIfExists(args);
        }

        if (!expectNext(tokenPool.RPAREN)) {
            return;
        }

        return args;

    };

    const parseProgram = (): TProgram => {

        const program = Program({statements: []});

        while (currentToken.type != tokenPool.EOF) {
            const statement = parseStatement();
            if (statement) {
                program.addToStatement(statement);
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
