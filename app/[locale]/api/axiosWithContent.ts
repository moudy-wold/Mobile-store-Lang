import axios from "axios";
import { GetTokenInSsr } from "./getTokenInssr";
import RedirectInCsc from "./redirectIncCsc";
import GetHostInSsr from "./getHostInSSr";

const axiosInstance = axios.create({
    baseURL: process.env.API_BASE_URL,
    headers: { 
        'Content-Type': 'multipart/form-data',
        'Accept': '/',
    },
});

axiosInstance.interceptors.request.use(async (config) => {
    const host = await GetHostInSsr().then((res) => res);
    const token = await GetTokenInSsr().then((res) => res?.value);
    if (token) {config.headers.Authorization = `Bearer ${token}` }
    // config.headers["X-Frontend-Host"] = host;
    config.headers["X-Frontend-Host"] = "moudy.aymen" ;

    if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data"; 
    }

    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {        
        if (error?.response?.status === 401 ) {
            await RedirectInCsc();
        }
        if( error?.response?.status === 403 && !error?.response?.data?.plan_expire){
            await RedirectInCsc();

        }
        return Promise.reject(error);
    }
);

export default axiosInstance;