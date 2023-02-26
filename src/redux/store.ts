import {configureStore} from '@reduxjs/toolkit'
import boardSlice from './boardSlice'
import authSlice from './authSlice'


export const store = configureStore({
    reducer:{
        board:boardSlice,
        auth:authSlice
    }
})