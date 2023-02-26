export interface IBoardState {
    board : string[],
    position: number,
    currentRow:number,
    enterClick:boolean
}

export interface IAuthState {
    userName : string,
}

export interface IRootState {
    board : IBoardState,
    auth: IAuthState
}