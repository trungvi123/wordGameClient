export interface IBoardState {
  board: string[];
  position: number;
  currentRow: number;
  enterClick: boolean;
  ls: number;
  ms: number;
  getWord: boolean;
  author: string;
  authorNote: string;
}
export interface IWordContributed {
  word:string,
  authorNote:string
}   
export interface IAuthState {
  email: string;
  id: string;
  isAdmin: boolean;
  wordContributed: IWordContributed[];
}

export interface IToastState {
  show: boolean;
  heading: string;
  content: string;
  type: string;
}

export interface IRootState {
  board: IBoardState;
  auth: IAuthState;
  toast: IToastState;
}
