import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    board: [
        "","","","","",
        "","","","","",
        "","","","","",
        "","","","","",
        "","","","","",
        "","","","",""
    ],
    position: 0, // vị trí tiếp theo có thể thêm kí tự mới,
    currentRow:0,
    enterClick:false
}


const boardSlice = createSlice({
    name:'board',
    initialState,
    reducers:{
        setBoard:(state,action)=>{
            state.board = action.payload
        },
        plusPosition:(state)=>{
            state.position++
        },
        minusPosition:(state)=>{
            state.position--
        },
        plusRow:(state)=>{
            state.currentRow++
        },
        setEnterClick:(state)=>{
            state.enterClick = !state.enterClick
        },
    }
})


export const {setBoard,plusPosition,minusPosition,plusRow,setEnterClick} = boardSlice.actions
export default boardSlice.reducer
