import {configureStore} from '@reduxjs/toolkit'
import boardSlice from './boardSlice'
import authSlice from './authSlice'
import toastSlice from './toastSlice'

export const store = configureStore({
    reducer:{
        board:boardSlice,
        auth:authSlice,
        toast:toastSlice
    }
})