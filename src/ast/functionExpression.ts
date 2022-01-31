import {getTokenLiteral} from './getTokenLiteral';
import {TExpression} from '../types/ast/expression';
import {Ttoken} from '../types/token';
import {TFunctionExpression, TFunctionExpressionInput} from '../types/ast/functionExpression';
import {TIdentifier} from '../types/ast/identifier';
import {TBlockStatement} from '../types/ast/blockStatement';

export function FunctionExpression(input: TFunctionExpressionInput): TFunctionExpression {

    let token = {...input.token};
    let parameters: TIdentifier[] = [];
    let body: TBlockStatement;

    const tokenLiteral = getTokenLiteral({token});
    const string = () => {
        const params = parameters.map((e) => e.string());
        return `${tokenLiteral()}(${params.join(',')}) ${body.string()}`;
    };

    const getParameters = () => parameters;
    const getBody = () => body;

    const setParameters = (params: TIdentifier[]) => {
        parameters = params;
    };
    const setBody = (bodyParam: TBlockStatement) => {
        body = bodyParam;
    };

    return {
        tokenLiteral,
        string,
        token,
        getParameters,
        setParameters,
        getBody,
        setBody,
    };
}