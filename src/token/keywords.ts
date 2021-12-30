import tokenPool from "./tokenPool";

type Tkeyword = { [k: string]: string }

export const keywords: Tkeyword = {
    "fn": tokenPool.FUNCTION,
    "let": tokenPool.LET
}

export const lookupIdent = (ident: string) => {
    if (keywords[ident]) {
        return keywords[ident]
    }
    return tokenPool.IDENT
}