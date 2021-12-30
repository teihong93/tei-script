export const isLetter = (char: string | null): boolean => {
    if (!char) return false;
    if (char.length > 1) throw new Error("1자리 문자만 판단 가능합니다")
    return 'a' <= char && char <= 'z' || 'A' <= char && char <= 'Z' || char === '_'
}

export const isDigit = (char: string | null): boolean => {
    if (!char) return false;
    if (char.length > 1) throw new Error("1자리 문자만 판단 가능합니다")
    return '0' <= char && char <= '9'
}