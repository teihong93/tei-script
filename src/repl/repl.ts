import {createInterface} from 'readline';
import {Lexer} from '../lexer/lexter';
import tokenPool from '../token/tokenPool';

let rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

export function runRepl() {
    console.log(' TeiScript REPL , press q to quit \n');
    const query = () => {
        rl.question('>>>', (answer) => {
            switch (answer.toLowerCase()) {
                case 'q':
                    console.log('Bye!');
                    rl.close();
                    break;
                default:
                    const lexer = Lexer({input: answer});
                    for (let t = lexer.nextToken(); t.type != tokenPool.EOF; t = lexer.nextToken()) {
                        console.log(t);
                    }
                    query();
            }
        });
    };
    query();
}
