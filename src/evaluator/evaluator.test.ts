import {testBooleanObject, testEval, testIntegerObject, testNilObject} from '../object/object.test';
import objectPool from '../object/objectPool';
import {TInteger} from '../types/object/integer';

it('! 전위연산자 평가 테스트 (23)', () => {
    const tests: {input: string, expected: boolean}[] = [
        {input: '!true', expected: false},
        {input: '!false', expected: true},
        {input: '!5', expected: false},
        {input: '!!true', expected: true},
        {input: '!!false', expected: false},
        {input: '!!5', expected: true},
    ];

    for (let test of tests) {
        const evaluated = testEval(test.input);
        testBooleanObject(evaluated, test.expected);
    }
});

it('- 전위연산자 평가 테스트 (24)', () => {
    const tests: {input: string, expected: number}[] = [
        {input: '5', expected: 5},
        {input: '10', expected: 10},
        {input: '-5', expected: -5},
        {input: '-10', expected: -10},
    ];

    for (let test of tests) {
        const evaluated = testEval(test.input);
        testIntegerObject(evaluated, test.expected);
    }
});

it('중위연산자 평가 테스트 (25)', () => {
    const tests: {input: string, expected: number}[] = [
        {input: '5', expected: 5},
        {input: '10', expected: 10},
        {input: '-5', expected: -5},
        {input: '-10', expected: -10},
        {input: '5 + 5 + 5 + 5 - 10', expected: 10},
        {input: '2 * 2 * 2 * 2 * 2', expected: 32},
        {input: '-50 + 100 + -50', expected: 0},
        {input: '5 * 2 + 10', expected: 20},
        {input: '5 + 2 * 10', expected: 25},
        {input: '20 + 2 * -10', expected: 0},
        {input: '50 / 2 * 2 + 10', expected: 60},
        {input: '2 * (5 + 10)', expected: 30},
        {input: '3 * 3 * 3 + 10', expected: 37},
        {input: '3 * (3 * 3) + 10', expected: 37},
        {input: '(5 + 10 * 2 + 15 / 3) * 2 + -10', expected: 50},
    ];

    for (let test of tests) {
        const evaluated = testEval(test.input);
        testIntegerObject(evaluated, test.expected);
    }
});

it('BOOL 표현식 테스트 (26)', () => {
    const tests: {input: string, expected: boolean}[] = [
        {input: 'true', expected: true},
        {input: 'false', expected: false},
        {input: '1<2', expected: true},
        {input: '1>2', expected: false},
        {input: '2<2', expected: false},
        {input: '1==1', expected: true},
        {input: '1!=1', expected: false},
        {input: '1!=2', expected: true},
    ];

    for (let test of tests) {
        const evaluated = testEval(test.input);
        testBooleanObject(evaluated, test.expected);
    }
});

it('BOOL 표현식 테스트 + 중위 표현 테스트 (27)', () => {
    const tests: {input: string, expected: boolean}[] = [
        {input: 'true == true', expected: true},
        {input: 'false == false', expected: true},
        {input: 'true == false', expected: false},
        {input: 'true!= false', expected: true},
        {input: '(1<2) == true', expected: true},
        {input: '(1<2) == false', expected: false},
        {input: '(1>2) == true', expected: false},
        {input: '(1>2) == false', expected: true},
    ];

    for (let test of tests) {
        const evaluated = testEval(test.input);
        testBooleanObject(evaluated, test.expected);
    }
});

it('if else 평가 테스트 (28) ', () => {
    const tests: {input: string, expected: any}[] = [
        {input: 'if (true) { 10 }', expected: 10},
        {input: 'if (false) { 10 }', expected: null},
        {input: 'if(1<2) { 10 }', expected: 10},
        {input: 'if(1>2) { 10 }', expected: null},
        {input: 'if(1>2) { 10 } else {20}', expected: 20},
        {input: 'if(1<2) { 10 } else {20}', expected: null},
    ];

    for (let test of tests) {
        const evaluated = testEval(test.input);
        if (evaluated.type() === objectPool.INTEGER_OBJECT) {
            testIntegerObject(evaluated, (evaluated as TInteger).value);
        }
        if (evaluated.type() === objectPool.NIL_OBJECT) {
            testNilObject(evaluated);
        }
    }
});