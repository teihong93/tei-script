import {TObject} from './object';

/* 이 언어에서 모든 type 은 object 이다*/

export type TNilInput = {
    value: null
}

export type TNil = TObject & TNilInput