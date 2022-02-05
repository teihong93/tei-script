import {TObject} from './object';

/* 이 언어에서 모든 type 은 object 이다*/

export type TIntegerInput = {
    value:number
}

export type TInteger = TObject & TIntegerInput