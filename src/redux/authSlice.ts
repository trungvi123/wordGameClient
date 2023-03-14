import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  id: "",
  wordContributed: [],
  isAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setInitial: (state) => {
      state.email = "";
      state.id = "";
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    setWordContributed: (state, action) => {
      state.wordContributed = action.payload;
    },
  },
});

export const { setEmail, setId, setInitial, setIsAdmin, setWordContributed } =
  authSlice.actions;

export default authSlice.reducer;
