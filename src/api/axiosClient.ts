import axios from "axios";
import { axiosConfig } from "./axiosConfig";
import jwt_decode from "jwt-decode";
import authApi from "./authApi";

axios.defaults.withCredentials = true; 

const getAccessToken = ():string => {
  let accessToken: string
  try {
    accessToken= JSON.parse(localStorage.getItem("gameToken") || " "); 
  } catch (error) {
    accessToken = " "
  }
  return accessToken
}


const axiosClient = axios.create({
  baseURL: axiosConfig.baseUrl,
  headers: {
    "Content-Type": "application/json"
  },
});

const axiosClientJwt = axios.create({
  baseURL: axiosConfig.baseUrl,
  headers: {
    "Content-Type": "application/json"
  },
});

// axiosClient
axiosClient.interceptors.request.use(async (config) => config);
axiosClient.interceptors.response.use(
  (response) => {
    if (response) {
      if (response && response.data) {
        return response.data;
      }
      return response;
    }
  },
  (err) => {
    // throw new Error(err);
  }
);

// axiosClient jwt

axiosClientJwt.interceptors.request.use(async (config) => {
  try {
    let date = new Date();
    
    config.headers.authorization = 'Beaerer '+ getAccessToken()
    var decodedToken: any = jwt_decode(getAccessToken());
    
    if (decodedToken?.exp < (date.getTime() / 1000)) {
      const data:any = await authApi.refreshToken();
      localStorage.setItem("gameToken", JSON.stringify(data?.accessToken || ""));
    } else {
      console.log("ch het han");
    }
  } catch (error) {
    console.log("loi");
    console.log(error);
    
  }

  return config;
});

axiosClientJwt.interceptors.response.use(
  (response) => {
    if (response) {
      if (response && response.data) {
        return response.data;
      }
      return response;
    }
  },
  (err) => {
    // throw new Error(err);
  }
);

export { axiosClientJwt };
export default axiosClient;
