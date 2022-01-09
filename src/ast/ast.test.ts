import {Ttoken} from '../types/token';
import tokenPool from '../token/tokenPool';
import {Lexer} from '../lexer/lexter';
import {expect} from 'chai';
import {Program} from './program';
import {LetStatement} from './letStatement';
import {Identifier} from './identifier';

it('string 함수 테스트(5)', () => {

    const program = Program({
        statements: [
            LetStatement({
                token: {type: tokenPool.LET, literal: 'let'},
                name: Identifier({
                    token: {type: tokenPool.IDENT, literal: 'myVar'}, value: 'myVar',
                }),
                value: Identifier(
                    {
                        token: {type: tokenPool.IDENT, literal: 'anotherVar'},
                        value: 'anotherVar',
                    },
                ),
            }),
        ],
    });

    expect(program.string()).to.equal("let myVar = anotherVar;");

});