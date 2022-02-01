import tokenPool from '../token/tokenPool';
import {expect} from 'chai';
import {Program} from './program';
import {LetStatement} from './letStatement';
import {Identifier} from './identifier';

it('string 함수 테스트(5)', () => {

    const letStatement = LetStatement({
        token: {type: tokenPool.LET, literal: 'let'},
    });

    const name = Identifier({
        token: {type: tokenPool.IDENT, literal: 'myVar'}, value: 'myVar',
    });

    const value = Identifier({
            token: {type: tokenPool.IDENT, literal: 'anotherVar'},
            value: 'anotherVar',
        },
    );

    letStatement.setName(name);
    letStatement.setValue(value);

    const program = Program({
        statements: [
            letStatement,
        ],
    });

    expect(program.string()).to.equal('let myVar = anotherVar;');

});