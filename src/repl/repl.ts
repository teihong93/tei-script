import {createInterface} from 'readline';
import {Lexer} from '../lexer/lexter';
import tokenPool from '../token/tokenPool';
import {Parser} from '../parser/parser';
import {assert} from 'chai';

let rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const deLexRepl = () => {
    const query = () => {
        rl.question('lexing start... please enter code. [q] to quit\n', (answer) => {
            switch (answer.toLowerCase()) {
                case 'q':
                    console.log('Bye!');
                    rl.close();
                    break;
                default: {
                    let lexer = Lexer({input: answer});
                    for (let t = lexer.nextToken(); t.type != tokenPool.EOF; t = lexer.nextToken()) {
                        console.log(t);
                    }
                    query();
                }
            }
        });
    };
    query();
};

const doParseRepl = () => {
    const query = () => {
        rl.question('parsing start... please enter code. [q] to quit\n', (answer) => {
            switch (answer.toLowerCase()) {
                case 'q':
                    console.log('Bye!');
                    rl.close();
                    break;
                default: {
                    let lexer = Lexer({input: answer});
                    let parser = Parser({lexer})
                    const program = parser.parseProgram()
                    const errors = parser.errors();
                    if (errors.length !== 0) {
                        const errMsg = errors.reduce((acc, e) => (acc + `\nerr: ${e}\n`), '');
                        console.log(`\n파서에서 ${errors.length} 개의 에러 발견 ${errMsg}`);
                    } else {
                        console.log(program.string())
                    }
                    query();
                }
            }
        });
    };
    query();
};

export function runRepl() {
    console.log(' TeiScript REPL , \npress [q] to quit \n[lex] to start lexing \n[parse] to start parse\n');
    const query = () => {
        rl.question('>>>', (answer) => {
            switch (answer.toLowerCase()) {
                case 'q':
                    console.log('Bye!');
                    rl.close();
                    break;
                case 'lex':
                    deLexRepl();
                    break;
                case 'parse':
                    doParseRepl();
                    break;
                default:
                    break;
            }
        });
    };
    query();
}


