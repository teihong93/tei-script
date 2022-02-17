import {TEval, TEvalInput} from '../types/evaluator';
import nodePool from '../ast/nodePool';
import {Integer} from '../object/interger';
import {TIntegerLiteral} from '../types/ast/integerLiteral';
import {TStatement} from '../types/ast/ast';
import {TObject} from '../types/object/object';
import {TProgram} from '../types/ast/program';
import {TExpressionStatement} from '../types/ast/expressionStatement';
import {TExpression} from '../types/ast/expression';
import {TBool} from '../types/ast/bool';
import {TPrefixExpression} from '../types/ast/prefixExpression';
import {TInfixExpression} from '../types/ast/infixExpression';
import {evalPrefixExpression} from './evalPrefixExpression';
import {evalInfixExpression} from './evalInfixExpression';
import {evalIfExpression} from './evalIfExpression';
import {TBoolean} from '../types/object/boolean';
import {FALSE_BOOLEAN, TRUE_BOOLEAN} from '../object/boolean';
import {TIfExpression} from '../types/ast/ifExpression';
import {TBlockStatement} from '../types/ast/blockStatement';
import {TReturnStatement} from '../types/ast/returnStatement';
import {ReturnValue} from '../object/returnValue';
import {TReturnValue} from '../types/object/returnValue';
import objectPool from '../object/objectPool';

/* ast 노드를 평가하는 함수. */
export function Eval(input: TEvalInput): TEval {
    let node = input.node;

    switch (node.type) {
        case nodePool.INTEGER_LITERAL : {
            return Integer({value: (node as TIntegerLiteral).value});
        }

        case nodePool.BOOL: {
            return getReferenceBoolean((node as TBool).value);
        }

        case nodePool.PROGRAM: {
            return evalStatements((node as TProgram).statements);
        }

        case nodePool.EXPRESSION_STATEMENT: {
            return Eval({node: (node as TExpressionStatement).expression as TExpression});
        }

        case nodePool.PREFIX_EXPRESSION: {
            const right = Eval({node: (node as TPrefixExpression).getRight() as TExpression});
            return evalPrefixExpression((node as TPrefixExpression).operator, right);
        }

        case nodePool.INFIX_EXPRESSION: {
            const left = Eval({node: (node as TInfixExpression).left});
            const right = Eval({node: (node as TInfixExpression).getRight() as TExpression});
            return evalInfixExpression((node as TInfixExpression).operator, left, right);
        }

        case nodePool.BLOCK_STATEMENT: {
            return evalStatements((node as TBlockStatement).statements);
        }

        case nodePool.IF_EXPRESSION: {
            return evalIfExpression((node as TIfExpression));
        }

        case nodePool.RETURN_STATEMENT: {
            const returnValue = Eval({node: (node as TReturnStatement).getReturnValue()});
            return ReturnValue({value: returnValue});
        }

        default:
            throw new Error(`평가할 수 없는 타입 (${node.type}) 입니다.`);
    }

}

/* TRUE 나 FALSE 는 싱글톤으로 존재하는게 좋음. 이미 만들어진 객체의 참조를 반환하는 함수 */
export function getReferenceBoolean(boolValue: boolean): TBoolean {
    return boolValue === true ? TRUE_BOOLEAN : FALSE_BOOLEAN;
}

function evalStatements(statements: TStatement[]): TObject {
    let result: TObject | undefined;
    for (let statement of statements) {
        result = Eval({node: statement});

        if (result.type() == objectPool.RETURN_VALUE_OBJECT) {
            return (result as TReturnValue).value;
        }

    }
    if (!result) throw new Error('유효한 statement 가 존재하지 않습니다');
    return result;
}

