import {TObject} from '../types/object/object';
import {Lexer} from '../lexer/lexter';
import {Parser} from '../parser/parser';
import {TInteger} from '../types/object/integer';
import {expect} from 'chai';
import objectPool from './objectPool';
import {Eval} from '../evaluator/evaluator';

const testEval = (input: string): TObject => {
    const lexer = Lexer({input});
    const parser = Parser({lexer});
    const program = parser.parseProgram();
    return Eval({node:program});
};

const testIntegerObject = (obj: TObject, expected: number) => {
    const intObj = obj as TInteger;
    expect(intObj.type()).to.equal(objectPool.INTEGER_OBJECT);
    expect(intObj.value).to.equal(expected);
};

it('Integer 객체 테스트 (21)', () => {
    const tests: {input: string, expected: number}[] = [
        {input: '5', expected: 5},
        {input: '10', expected: 10},
    ];

    type a = {input:string,expected:number}
    type b = {input:string}

    for (let test of tests) {
        const evaluated = testEval(test.input);
        testIntegerObject(evaluated, test.expected);
    }
});