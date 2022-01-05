import {Ttoken} from './token';

export type TlexerInput = {
    input: string;
};

/* lexer 인스턴스가 제공해야 할 공개 함수들*/
export type Tlexer = {
    nextToken: () => Ttoken
};
