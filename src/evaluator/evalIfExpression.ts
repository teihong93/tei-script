import {TObject} from '../types/object/object';
import {TIfExpression} from '../types/ast/ifExpression';
import {Eval} from './evaluator';
import {FALSE_BOOLEAN, TRUE_BOOLEAN} from '../object/boolean';
import {NIL} from '../object/nil';
import {TBlockStatement} from '../types/ast/blockStatement';

export function evalIfExpression(ifExp: TIfExpression): TObject {
    const condition = Eval({node: ifExp.getCondition()});

    if (condition == TRUE_BOOLEAN) return getEvalBlockOrNil(ifExp.getConsequence());
    if (condition == FALSE_BOOLEAN) return getEvalBlockOrNil(ifExp.getAlternative());

    // truthy 가 아닌 명확한 참 거짓만 허용한다
    throw new Error(`Boolean 으로 평가되지 않는 값 ${condition.inspect()} 입니다`);
}

function getEvalBlockOrNil(block?: TBlockStatement) {
    if (block) {
        return Eval({node: block});
    }
    return NIL;
}