import {getTokenLiteral} from './getTokenLiteral';
import {TExpression} from '../types/ast/expression';
import {Ttoken} from '../types/token';
import {TIfExpression, TIfExpressionInput} from '../types/ast/ifExpression';
import {TBlockStatement} from '../types/ast/blockStatement';

export function IfExpression(input: TIfExpressionInput): TIfExpression {

    let token: Ttoken = {...input.token};
    let condition: TExpression;
    let consequence: TBlockStatement | undefined;
    let alternative: TBlockStatement | undefined;

    const getCondition = () => condition;
    const getConsequence = () => consequence;
    const getAlternative = () => alternative;

    const setCondition = (cond: TExpression) => {
        condition = cond;
    };
    const setConsequence = (cons: TBlockStatement) => {
        consequence = cons;
    };
    const setAlternative = (alt: TBlockStatement) => {
        alternative = alt;
    };

    const string = () => `if(${condition.string()}) ${consequence?.string()} ${alternative ? 'else ' + alternative.string() : ''}`;

    return {
        tokenLiteral: getTokenLiteral({token}),
        string,
        token,
        getCondition,
        getConsequence,
        getAlternative,
        setCondition,
        setConsequence,
        setAlternative,
    };
}