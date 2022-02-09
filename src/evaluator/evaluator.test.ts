import {testBooleanObject, testEval } from "../object/object.test";

it('BANG 전위연산자 테스트 (23)', () => {
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