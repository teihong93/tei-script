export type TlexerInput = {
  input: string;
};

export type TlexerState = {
  input: string;
  /* 렉서의 현재 커서 */
  cursor: number;
  /* 렉서의 다음 커서 */
  nextCursor: number;
  /* 현재 커서가 가르키는 문자 , 마지막까지 읽었으면 null */
  cursorChar: string | null;
};
