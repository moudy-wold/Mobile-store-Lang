import axios from "axios";
import { GetTokenInSsr } from "./getTokenInssr";
import  GetHsotInSsr  from "./getHostInSSr";
import RedirectInCsc from "./redirectIncCsc";

const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
});
axiosInstance.interceptors.request.use(async(config)  => {
  const host = await GetHsotInSsr().then((res)=> res )
  const token  = await GetTokenInSsr().then((res)=> res?.value )    
  config.headers.Authorization = `Bearer ${token}`;  
  config.headers["Accept"] = "/"
  config.headers["X-Frontend-Host"] = "moudy.aymen" ;
  // config.headers["X-Frontend-Host"] = host ;

    return config;
  } 
);

axiosInstance.interceptors.response.use( (response)  => {
    return response;
  },
  async (error) => {
    
    if (error?.response?.data?.error?.message == "Unauthorized") {      
      await RedirectInCsc();  
    }
    if( error?.response?.status === 403 && !error?.response?.data?.plan_expire){    
      await RedirectInCsc();
    }     
    return Promise.reject(error);
  }
);


export default axiosInstance;

