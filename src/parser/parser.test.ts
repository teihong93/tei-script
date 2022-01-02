import {expect, assert} from 'chai';
import {TLetStatementState, TStatementOutput} from '../types/ast';
import {createLexer} from '../lexer/lexter';
import {createParser} from './parser';
import {TParserOutput} from '../types/parser';

it('파서 LET 테스트', () => {

    const testLetStatement = (statement: TStatementOutput, name: string) => {
        console.log(statement);
        expect(statement.tokenLiteral()).to.equal('let');
        expect(statement.getStatement().name?.value, name);
        expect(statement.getStatement().name?.tokenLiteral(), name);
    };

    const checkParserErrors = (parser: TParserOutput) => {
        const errors = parser.errors();
        if (errors.length === 0) {
            return;
        }
        const errMsg = errors.reduce((acc, e) => (acc + `\nerr: ${e}\n`),'');
        assert.fail(`\n파서에서 ${errors.length} 개의 에러 발견 ${errMsg}`);
    };

    const input = `
        let x = 5;
        let y = 10;
        let foobar = 838383;
    `;

    const lexer = createLexer().init({input: input});
    const parser = createParser().init({lexer: lexer});

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
        testLetStatement(stmt, tests[testIdx].expectedIdentifier);
    }

});