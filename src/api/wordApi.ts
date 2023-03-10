import {axiosClientJwt} from "./axiosClient";

export interface ICreateWord {
    word:string,
    author:string,
    authorNote:string
}

export interface upls{
    _id:string
    ls:number,
}

export interface upms{
    _id:string
    score:number,
}

export interface testWord{
    word:string
}


const wordApi = {
    createWord : (payload:ICreateWord)=> {
        const url = `/wordKey/createWord`
        return axiosClientJwt.post(url,payload)
    },
    createPendingWord:(payload:ICreateWord)=>{
        const url = `/wordKey/pendingWord`
        return axiosClientJwt.post(url,payload)
    },
    getAllPendingWord:()=>{
        const url = `/wordKey/getAllPendingWord`
        return axiosClientJwt.get(url)
    },
    getWord:()=>{
        const url = `/wordKey/getWord`
        return axiosClientJwt.get(url)
    },
    testWord:(payload:testWord)=>{
        const url = `/wordKey/testWord`
        return axiosClientJwt.post(url,payload)
    },
    upls: (payload:upls)=> {
        const url = `/wordKey/udls/${payload._id}`
        return axiosClientJwt.post(url,payload)
    },
    upms: (payload:upms)=> {
        const url = `/wordKey/udms/${payload._id}`
        return axiosClientJwt.post(url,payload)
    },
    getCookie: ()=> {
        const url = `/auth/getCookie`
        return axiosClientJwt.get(url)
    },
    getTopUsers: ()=> {
        const url = `/wordKey/getTopUsers`
        return axiosClientJwt.get(url)
    },
    deleteWord:(_id:string)=> {
        const url = `/wordKey/deteleWord/${_id}`
        return axiosClientJwt.delete(url)
    }
}

export default wordApi