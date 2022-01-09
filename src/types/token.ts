import tokenPool from '../token/tokenPool';

export type TtokenType = string;

export type Ttoken = {
  type: TtokenType;
  literal: string;
};

export type tokenKeys = keyof typeof tokenPool;
export type tokenTypes = typeof tokenPool[tokenKeys];