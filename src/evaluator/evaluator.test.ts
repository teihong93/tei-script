import {testBooleanObject, testEval,testIntegerObject } from "../object/object.test";

it('! 전위연산자 평가 테스트 (23)', () => {
    const tests: {input: string, expected: boolean}[] = [
        {input: '!true', expected: false},
        {input: '!false', expected: true},
        {input: '!5', expected: false},
        {input: '!!true', expected: true},
        {input: '!!false', expected: false},
        {input: '!!5', expected: true}
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