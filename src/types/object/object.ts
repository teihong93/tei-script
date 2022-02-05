export type TObjectType = string;
export type TObject = {
    type: () => TObjectType,
    inspect: () => string
}
