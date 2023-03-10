import {createSlice } from '@reduxjs/toolkit'



const initialState = {
    show: false,
    heading: '',
    content:'',
    type: ''
}

const toastSlice = createSlice({
    name:'toast',
    initialState,
    reducers:{
        setToast : (state,action)=>{
            state.show = action.payload.show
            state.heading = action.payload.heading
            state.content = action.payload.content
            state.type = action.payload.type
        }
    }
})

export const {setToast} = toastSlice.actions
export default toastSlice.reducer