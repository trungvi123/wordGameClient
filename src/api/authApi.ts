import axiosClient,{axiosClientJwt} from "./axiosClient";


export interface dataSignIn {
  email: string;
  password: string;
}

export interface dataSignUp {
  email: string;
  password: string;
  confirmPassword: string;
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
