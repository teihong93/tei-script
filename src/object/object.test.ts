import {TObject} from '../types/object/object';
import {Lexer} from '../lexer/lexter';
import {Parser} from '../parser/parser';
import {TInteger} from '../types/object/integer';
import {expect} from 'chai';
import objectPool from './objectPool';
import {Eval} from '../evaluator/evaluator';
import {TBoolean} from '../types/object/boolean';

export const testEval = (input: string): TObject => {
    const lexer = Lexer({input});
    const parser = Parser({lexer});
    const program = parser.parseProgram();
    return Eval({node: program});
};

export const testIntegerObject = (obj: TObject, expected: number) => {
    const intObj = obj as TInteger;
    expect(intObj.type()).to.equal(objectPool.INTEGER_OBJECT);
    expect(intObj.value).to.equal(expected);
};

export const testBooleanObject = (obj: TObject, expected: boolean) => {
    const booleanObj = obj as TBoolean;
    expect(booleanObj.type()).to.equal(objectPool.BOOLEAN_OBJECT);
    expect(booleanObj.value).to.equal(expected);
};

it('Integer 객체 테스트 (21)', () => {
    const tests: {input: string, expected: number}[] = [
        {input: '5', expected: 5},
        {input: '10', expected: 10},
    ];

    for (let test of tests) {
        const evaluated = testEval(test.input);
        testIntegerObject(evaluated, test.expected);
    }
});

it('BOOLEAN 객체 테스트 (22)', () => {
    const tests: {input: string, expected: boolean}[] = [
        {input: 'true', expected: true},
        {input: 'false', expected: false},
    ];

    for (let test of tests) {
        const evaluated = testEval(test.input);
        testBooleanObject(evaluated, test.expected);
    }
});