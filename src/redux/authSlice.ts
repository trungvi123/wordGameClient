import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: '',
    id:'',
    isAdmin: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
      setId: (state,action)=> {
        state.id = action.payload
      },
      setEmail: (state,action)=> {
        state.email = action.payload
      },
      setInitial: (state)=> {
        state.email = ''
        state.id = ''
      },
      setIsAdmin : (state,action)=> {
        state.isAdmin = action.payload
      }
  }
});

export const {setEmail,setId,setInitial,setIsAdmin} = authSlice.actions

export default authSlice.reducer