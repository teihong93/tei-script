import {TEval, TEvalInput} from '../types/evaluator';
import nodePool from '../ast/nodePool';
import {Integer} from '../object/interger';
import {TIntegerLiteral} from '../types/ast/integerLiteral';
import {TStatement} from '../types/ast/ast';
import {TObject} from '../types/object/object';
import {TProgram} from '../types/ast/program';
import {TExpressionStatement} from '../types/ast/expressionStatement';
import {TExpression} from '../types/ast/expression';
import {TRUE_BOOLEAN, FALSE_BOOLEAN} from '../object/boolean';
import {TBool} from '../types/ast/bool';
import {TBoolean} from '../types/object/boolean';

/* ast 노드를 평가하는 함수. */
export function Eval(input: TEvalInput): TEval {
    let node = input.node;

    switch (node.type) {
        case nodePool.INTEGER_LITERAL :
            return Integer({value: (node as TIntegerLiteral).value});

        case nodePool.BOOL:
            return getReferenceBoolean((node as TBool).value);

        case nodePool.PROGRAM:
            return evalStatements((node as TProgram).statements);

        case nodePool.EXPRESSION_STATEMENT:
            return Eval({node: (node as TExpressionStatement).expression as TExpression});

        default:
            throw new Error(`평가할 수 없는 타입 (${node.type}) 입니다.`);
    }

}

function getReferenceBoolean(boolValue: boolean): TBoolean {
    return boolValue === true ? TRUE_BOOLEAN : FALSE_BOOLEAN;
}

function evalStatements(statements: TStatement[]): TObject {
    let result: TObject | undefined;
    for (let statement of statements) {
        result = Eval({node: statement});
    }
    if (!result) throw new Error('유효한 statement 가 존재하지 않습니다');
    return result;
}
