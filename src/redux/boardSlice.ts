import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  board: [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ],
  position: 0, // vị trí tiếp theo có thể thêm kí tự mới,
  currentRow: 0,
  enterClick: false,
  ls: 0,
  ms: 0,
  author:"",
  authorNote:"",
  getWord:false
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoard: (state, action) => {
      state.board = action.payload;
    },
    setInitialBoard:(state)=>{
      state.board = initialState.board
      state.position= initialState.position
      state.currentRow= initialState.currentRow
      state.enterClick= initialState.enterClick
    },
    plusPosition: (state) => {
      state.position++;
    },
    minusPosition: (state) => {
      state.position--;
    },
    plusRow: (state) => {
      state.currentRow++;
    },
    setEnterClick: (state) => {
      state.enterClick = !state.enterClick;
    },
    setLs: (state, action) => {
      state.ls = action.payload;
    },
    setMs: (state, action) => {
      state.ms = action.payload;
    },
    setAuthor: (state, action) => {
      state.author = action.payload;
    },
    setAuthorNote: (state, action) => {
      state.authorNote = action.payload;
    },
    setGetWord: (state) => {
      state.getWord = !state.getWord;
    },
  },
});

export const {
  setBoard,
  plusPosition,
  minusPosition,
  plusRow,
  setEnterClick,
  setLs,
  setMs,setAuthor,setAuthorNote,setInitialBoard,setGetWord
} = boardSlice.actions
export default boardSlice.reducer;
