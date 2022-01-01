import {expect, should} from 'chai';
import {TLetStatementState, TStatementOutput} from '../types/ast';
import {createLexer} from '../lexer/lexter';
import {createParser} from './parser';

it('파서 LET 테스트', () => {

    const testLetStatement = (statement: TStatementOutput, name: string) => {
        expect(statement.tokenLiteral()).to.equal('let');
        expect(statement.getStatement().name.value, name);
        expect(statement.getStatement().name.tokenLiteral(), name);
    };

    const input = `
        let x = 5;
        let y = 10;
        let foobar = 838383;
    `;

    const lexer = createLexer().init({input: input});
    const parser = createParser().init({lexer: lexer});

    const program = parser.parseProgram();
    expect(program).exist;
    expect(program.statements.length).to.equal(3);

    const tests: {expectedIdentifier: string}[] = [
        {expectedIdentifier: 'x'},
        {expectedIdentifier: 'y'},
        {expectedIdentifier: 'foobar'},
    ];

    for (let testIdx in tests) {
        const stmt = program.statements[testIdx];
        testLetStatement(stmt, tests[testIdx].expectedIdentifier);
    }

});