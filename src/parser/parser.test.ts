import {expect, assert} from 'chai';
import {TStatement} from '../types/ast/ast';
import {Lexer} from '../lexer/lexter';
import {Parser} from './parser';
import {TParser} from '../types/parser';
import {TLetStatement} from '../types/ast/letStatement';
import {TExpressionStatement} from '../types/ast/expressionStatement';
import {TIdentifier} from '../types/ast/identifier';
import {TIntegerLiteral} from '../types/ast/integerLiteral';
import {TPrefixExpression} from '../types/ast/prefixExpression';
import {TExpression} from '../types/ast/expression';
import {TInfixExpression} from '../types/ast/infixExpression';

const checkParserErrors = (parser: TParser) => {
    const errors = parser.errors();
    if (errors.length === 0) {
        return;
    }
    const errMsg = errors.reduce((acc, e) => (acc + `\nerr: ${e}\n`), '');
    assert.fail(`\n파서에서 ${errors.length} 개의 에러 발견 ${errMsg}`);
};

const testIntegerLiteral = (il: TExpression, value: number) => {
    const integ = il as TIntegerLiteral;
    expect(integ.value).to.equal(value);
    expect(integ.tokenLiteral()).to.equal(`${value}`);
};

it('파서 LET 테스트(3)', () => {

    const testLetStatement = (statement: TLetStatement, name: string) => {
        expect(statement.tokenLiteral()).to.equal('let');
        expect(statement.name.value, name);
        expect(statement.name?.tokenLiteral(), name);
    };

    const input = `
        let x = 5;
        let y = 10;
        let foobar = 838383;
    `;

    const lexer = Lexer({input: input});
    const parser = Parser({lexer: lexer});

    const program = parser.parseProgram();
    checkParserErrors(parser);
    expect(program).exist;
    expect(program.statements.length).to.equal(3);

    const tests: {expectedIdentifier: string}[] = [
        {expectedIdentifier: 'x'},
        {expectedIdentifier: 'y'},
        {expectedIdentifier: 'foobar'},
    ];

    for (let testIdx in tests) {
        const stmt = program.statements[testIdx];
        testLetStatement(stmt as TLetStatement, tests[testIdx].expectedIdentifier);
    }

});

it('파서 RETURN 테스트(4)', () => {

    const input = `
        return 5;
        return 10;
        return 99332421;
    `;

    const lexer = Lexer({input: input});
    const parser = Parser({lexer: lexer});

    const program = parser.parseProgram();
    checkParserErrors(parser);
    expect(program).exist;
    expect(program.statements.length).to.equal(3);

    for (let test of program.statements) {
        expect(test.tokenLiteral()).to.equal('return');
    }

});

it('파서 식별자 Expression 테스트(6)', () => {

    const input = `foobar;`;

    const lexer = Lexer({input: input});
    const parser = Parser({lexer: lexer});

    const program = parser.parseProgram();
    checkParserErrors(parser);
    expect(program).exist;
    expect(program.statements.length).to.equal(1); //foobar 하나니까 1

    const statement = program.statements[0] as TExpressionStatement;

    const ident = statement.expression as TIdentifier;

    expect(ident.value).to.equal('foobar');
    expect(ident.tokenLiteral()).to.equal('foobar');


});

it('파서 정수 리터럴 테스트(7)', () => {

    const input = `5;`;

    const lexer = Lexer({input: input});
    const parser = Parser({lexer: lexer});

    const program = parser.parseProgram();
    checkParserErrors(parser);
    expect(program).exist;
    expect(program.statements.length).to.equal(1); //5 하나니까 1

    const statement = program.statements[0] as TExpressionStatement;

    const literal = statement.expression as TIntegerLiteral;

    expect(literal.value).to.equal(5);
    expect(literal.tokenLiteral()).to.equal('5');

});

it('파서 전위 연산자 테스트(8)', () => {

    const tests: {input: string, operator: string, value: number}[] = [
        {input: '!5;', operator: '!', value: 5},
        {input: '-15;', operator: '-', value: 15},
    ];

    for (let t of tests) {
        const lexer = Lexer({input: t.input});
        const parser = Parser({lexer: lexer});

        const program = parser.parseProgram();
        checkParserErrors(parser);

        expect(program).exist;
        expect(program.statements.length).to.equal(1);

        const statement = program.statements[0] as TExpressionStatement;

        const exp = statement.expression as TPrefixExpression;

        expect(exp.operator).to.equal(t.operator);
        expect(exp.getRight()).exist;
        testIntegerLiteral(exp.getRight() as TExpression,t.value)
    }
});

it('파서 중위 연산자 테스트(9)', () => {

    const tests: {input: string, operator: string, leftValue: number,rightValue:number}[] = [
        {input: '5+5;', operator: '+', leftValue:5,rightValue:5},
        {input: '5-5;', operator: '-', leftValue:5,rightValue:5},
        {input: '5*5;', operator: '*', leftValue:5,rightValue:5},
        {input: '5>5;', operator: '>', leftValue:5,rightValue:5},
        {input: '5==5;', operator: '==', leftValue:5,rightValue:5},
        {input: '5!=5;', operator: '!=', leftValue:5,rightValue:5},
    ];

    for (let t of tests) {
        const lexer = Lexer({input: t.input});
        const parser = Parser({lexer: lexer});

        const program = parser.parseProgram();
        checkParserErrors(parser);

        expect(program).exist;
        expect(program.statements.length).to.equal(1);

        const statement = program.statements[0] as TExpressionStatement;

        const exp = statement.expression as TInfixExpression;

        expect(exp.operator).to.equal(t.operator);
        expect(exp.getRight()).exist;
        expect(exp.left).exist;

        testIntegerLiteral(exp.left as TExpression,t.leftValue)
        testIntegerLiteral(exp.getRight() as TExpression,t.rightValue)

    }
});

it('파서 우선순위 테스트(10)', () => {

    const tests: {input: string, expected:string}[] = [
        {input: '-a*b', expected:'((-a)*b)'},
        {input: '!-a', expected:'(!(-a))'},
        {input: 'a+b+c', expected:'((a+b)+c)'},
        {input: 'a+b-c', expected:'((a+b)-c)'},
        {input: 'a*b*c', expected:'((a*b)*c)'},
        {input: 'a*b/c', expected:'((a*b)/c)'},
        {input: 'a+b/c', expected:'(a+(b/c))'},
        {input: 'a+b*c+d/e-f', expected:'(((a+(b*c))+(d/e))-f)'},
        {input: '3+4;-5*5', expected:'(3+4)((-5)*5)'},
        {input: '5>4==3<4', expected:'((5>4)==(3<4))'},
        {input: '3+4*5==3*1+4*5', expected:'((3+(4*5))==((3*1)+(4*5)))'},
    ];

    for (let t of tests) {
        const lexer = Lexer({input: t.input});
        const parser = Parser({lexer: lexer});

        const program = parser.parseProgram();
        checkParserErrors(parser);

        expect(program).exist;
        expect(program.string()).to.equal(t.expected);

    }
});