import axiosClient,{axiosClientJwt} from "./axiosClient";

const wordApi = {
    getAllWord : ()=> {
        const url = '/wordKey/'
        return axiosClientJwt.get(url)
    }
}

export default wordApi