import axiosClient,{axiosClientJwt} from "./axiosClient";


interface dataSignIn {
  userName: string;
  password: string;
}

interface dataSignUp {
  userName: string;
  password: string;
  comfirmPassword: string;
}


const authApi = {
  signIn: (payload: dataSignIn) => {
    const url = "/auth/signIn";
    return axiosClient.post(url, payload);
  },
  signUp: (payload:dataSignUp) => {
    const url = "/auth/signUp";
    return axiosClient.post(url,payload);
  },
  refreshToken: ()=> {
      const url = "/auth/refreshToken"
      return axiosClient.get(url, {withCredentials: true})
  }
};

export default authApi;
