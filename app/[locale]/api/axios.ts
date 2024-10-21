import axios from "axios";
import { GetTokenInSsr } from "./getTokenInssr";
import  GetHsotInSsr  from "./getHostInSSr";
import RedirectInCsc from "./redirectIncCsc";
import RedirectToUpdatePlan from "./RedirectToUpdatePlan";
import fetchCsrfToken from "./CsrfToken";

const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
});
axiosInstance.interceptors.request.use(async(config)  => {
  const host = await GetHsotInSsr().then((res)=> res )
  const token  = await GetTokenInSsr().then((res)=> res?.value )    
  const csrfTokenData = await fetchCsrfToken();

  if(csrfTokenData != null ){
    config.headers["XSRF-TOKEN"] = csrfTokenData[0];
    config.headers["mobil_store_session"] = csrfTokenData[1];
  }

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
  async (error:any) => {
    console.log(error,"qqqqqqqqqqqqqqqqqqq")
    
    if (error?.response?.data?.error?.message == "Unauthorized" || error?.response?.data?.message == "Unauthenticated.") {
      console.log("Unauthorized")
      await RedirectInCsc();  
    }
    if( error?.response?.status === 403 && !error?.response?.data?.plan_expire){    
      console.log(403 ,"expirrrrrrre")
      await RedirectInCsc();
    }     
    if( error?.response?.status === 403 && !error?.response?.data?.active){    
      console.log("acitveee")
      await RedirectToUpdatePlan();
    }     
    return Promise.reject(error);
  }
);


export default axiosInstance;

