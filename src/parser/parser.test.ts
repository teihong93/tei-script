import {expect, assert} from 'chai';
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
import {TBool} from '../types/ast/bool';
import {TIfExpression} from '../types/ast/ifExpression';
import {TFunctionExpression} from '../types/ast/functionExpression';
import {TCallExpression} from '../types/ast/callExpression';

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

const testIdentifier = (exp: TExpression, value: string) => {
    const identifier = exp as TIdentifier;
    expect(identifier.value).to.equal(value);
    expect(identifier.tokenLiteral()).to.equal(`${value}`);
};

const testLiteralExpression = (exp: TExpression, expected: any) => {
    switch (typeof expected) {
        case 'number':
            return testIntegerLiteral(exp, expected);
        case 'string':
            return testIdentifier(exp, expected);
        case 'boolean':
            return testBoolLiteral(exp, expected);
    }
};

const testInfixExpression = (exp: TExpression, left: any, operator: string, right: any) => {
    const opExp = exp as TInfixExpression;

    testLiteralExpression(opExp.left, left);
    expect(opExp.operator).to.equal(operator);
    testLiteralExpression(opExp.getRight() as TExpression, right);
};

const testBoolLiteral = (exp: TExpression, bool: boolean) => {
    const boolExp = exp as TBool;
    expect(boolExp.value).to.equal(bool);
    expect(boolExp.tokenLiteral()).to.equal(`${bool}`);
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
        testIntegerLiteral(exp.getRight() as TExpression, t.value);
    }
});

it('파서 중위 연산자 테스트(9)', () => {

    const tests: {input: string, operator: string, leftValue: number, rightValue: number}[] = [
        {input: '5+5;', operator: '+', leftValue: 5, rightValue: 5},
        {input: '5-5;', operator: '-', leftValue: 5, rightValue: 5},
        {input: '5*5;', operator: '*', leftValue: 5, rightValue: 5},
        {input: '5>5;', operator: '>', leftValue: 5, rightValue: 5},
        {input: '5==5;', operator: '==', leftValue: 5, rightValue: 5},
        {input: '5!=5;', operator: '!=', leftValue: 5, rightValue: 5},
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

        testIntegerLiteral(exp.left as TExpression, t.leftValue);
        testIntegerLiteral(exp.getRight() as TExpression, t.rightValue);
        testInfixExpression(exp, t.leftValue, t.operator, t.rightValue);
    }

});

it('파서 우선순위 테스트(10)', () => {

    const tests: {input: string, expected: string}[] = [
        {input: '1+2+3', expected: '((1+2)+3)'},
        {input: '-a*b', expected: '((-a)*b)'},
        {input: '!-a', expected: '(!(-a))'},
        {input: 'a+b+c', expected: '((a+b)+c)'},
        {input: 'a+b-c', expected: '((a+b)-c)'},
        {input: 'a*b*c', expected: '((a*b)*c)'},
        {input: 'a*b/c', expected: '((a*b)/c)'},
        {input: 'a+b/c', expected: '(a+(b/c))'},
        {input: 'a+b*c+d/e-f', expected: '(((a+(b*c))+(d/e))-f)'},
        {input: '3+4;-5*5', expected: '(3+4)((-5)*5)'},
        {input: '5>4==3<4', expected: '((5>4)==(3<4))'},
        {input: '3+4*5==3*1+4*5', expected: '((3+(4*5))==((3*1)+(4*5)))'},
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

it('파서 bool 테스트(11)', () => {

    const tests: {input: string, expected: boolean}[] = [
        {input: 'true;', expected: true},
        {input: 'false;', expected: false},
    ];

    for (let t of tests) {
        const lexer = Lexer({input: t.input});
        const parser = Parser({lexer: lexer});

        const program = parser.parseProgram();
        checkParserErrors(parser);

        expect(program).exist;
        expect(program.statements.length).to.equal(1);

        const statement = program.statements[0] as TExpressionStatement;

        const exp = statement.expression as TBool;

        expect(exp.value).to.equal(t.expected);

    }
});

it('Bool 이 섞인 우선순위 테스트 (12)', () => {

    const tests: {input: string, expected: string}[] = [
        {input: 'true', expected: 'true'},
        {input: 'false', expected: 'false'},
        {input: '3>5==false', expected: '((3>5)==false)'},
        {input: '3<5==true', expected: '((3<5)==true)'},
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

it('Bool 이 섞인 중위연산자 테스트 (13)', () => {

    const tests: {input: string, operator: string, leftValue: any, rightValue: any}[] = [
        {input: 'true==true;', operator: '==', leftValue: true, rightValue: true},
        {input: 'true!=false;', operator: '!=', leftValue: true, rightValue: false},
        {input: 'false==false;', operator: '==', leftValue: false, rightValue: false},
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

        testInfixExpression(exp, t.leftValue, t.operator, t.rightValue);
    }

});

it('괄호가 있는 식 우선순위 테스트 (14)', () => {

    const tests: {input: string, expected: string}[] = [
        {input: '1+(2+3)+4', expected: '((1+(2+3))+4)'},
        {input: '(5+5)*2', expected: '((5+5)*2)'},
        {input: '2/(5+5)', expected: '(2/(5+5))'},
        {input: '-(5+5)', expected: '(-(5+5))'},
        {input: '!(true==true)', expected: '(!(true==true))'},
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

it('if 테스트 (15)', () => {

    const input = 'if (x<y) { x }';

    const lexer = Lexer({input: input});
    const parser = Parser({lexer: lexer});

    const program = parser.parseProgram();
    checkParserErrors(parser);

    expect(program).exist;

    expect(program.statements.length).to.equal(1);
    const statement = program.statements[0] as TExpressionStatement;

    const exp = statement.expression as TIfExpression;
    testInfixExpression(exp.getCondition(), 'x', '<', 'y');

    expect(exp.getConsequence()?.statements.length).to.equal(1);
    const consequence = exp.getConsequence()?.statements[0] as TExpressionStatement;
    testIdentifier(consequence.expression as TExpression, 'x');

    expect(exp.getAlternative()).to.equal(undefined);

});

it('if else 테스트 (16)', () => {

    const input = 'if(x<y) {x} else {y}';

    const lexer = Lexer({input: input});
    const parser = Parser({lexer: lexer});

    const program = parser.parseProgram();
    checkParserErrors(parser);

    expect(program).exist;

    expect(program.statements.length).to.equal(1);
    const statement = program.statements[0] as TExpressionStatement;

    const exp = statement.expression as TIfExpression;
    testInfixExpression(exp.getCondition(), 'x', '<', 'y');

    expect(exp.getConsequence()?.statements.length).to.equal(1);
    const consequence = exp.getConsequence()?.statements[0] as TExpressionStatement;
    testIdentifier(consequence.expression as TExpression, 'x');

    expect(exp.getAlternative()?.statements.length).to.equal(1);
    const alternative = exp.getAlternative()?.statements[0] as TExpressionStatement;
    testIdentifier(alternative.expression as TExpression, 'y');

});

it('function 테스트 (17)', () => {

    const input = 'function(x,y) { x + y; }';

    const lexer = Lexer({input: input});
    const parser = Parser({lexer: lexer});

    const program = parser.parseProgram();
    checkParserErrors(parser);

    expect(program).exist;

    expect(program.statements.length).to.equal(1);
    const statement = program.statements[0] as TExpressionStatement;

    const exp = statement.expression as TFunctionExpression;
    expect(exp.getParameters().length).to.equal(2); // x,y

    testLiteralExpression(exp.getParameters()[0], 'x');
    testLiteralExpression(exp.getParameters()[1], 'y');

    expect(exp.getBody().statements.length).to.equal(1); // { x+y; }

    const bodyStatement = exp.getBody().statements[0] as TExpressionStatement;
    testInfixExpression(bodyStatement.expression as TExpression, 'x', '+', 'y');
});

it('function 인자 테스트 (18)', () => {

    const tests: {input: string, expected: string[]}[] = [
        {input: 'function(){}', expected: []},
        {input: 'function(x){}', expected: ['x']},
        {input: 'function(x,y,z){}', expected: ['x','y','z']},
    ];

    for (let t of tests) {
        const lexer = Lexer({input: t.input});
        const parser = Parser({lexer: lexer});

        const program = parser.parseProgram();
        checkParserErrors(parser);

        const statement = program.statements[0] as TExpressionStatement
        const functionExp = statement.expression as TFunctionExpression

        expect(functionExp.getParameters().length).to.equal(t.expected.length);

        for(let i in t.expected){
         testLiteralExpression(functionExp.getParameters()[i],t.expected[i])
        }
    }

});

it('call expression 테스트 (19)', () => {

    const input = 'add(1,2*3,4+5);';

    const lexer = Lexer({input: input});
    const parser = Parser({lexer: lexer});

    const program = parser.parseProgram();
    checkParserErrors(parser);

    expect(program).exist;

    expect(program.statements.length).to.equal(1);
    const statement = program.statements[0] as TExpressionStatement;

    const exp = statement.expression as TCallExpression;

    testIdentifier(exp.func, 'add');

    expect(exp.argument.length).to.equal(3); // (1,2*3,4+5)

    testLiteralExpression(exp.argument[0],1)
    testInfixExpression(exp.argument[1],2,"*",3)
    testInfixExpression(exp.argument[2],4,"+",5)

});

it('call expression 의 ( 가 들어간 우선순위 테스트(20)', () => {

    const tests: {input: string, expected: string}[] = [
        {input: "a+add(b*c)+d", expected: "((a+add((b*c)))+d)"},
        {input: "add(a,b,1,2*3,4+5,add(6,7*8))", expected: "add(a,b,1,(2*3),(4+5),add(6,(7*8)))"},
        {input: "add(a+b+c*d/f+g)", expected: "add((((a+b)+((c*d)/f))+g))"},
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