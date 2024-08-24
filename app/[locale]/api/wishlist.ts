import axios from "./axiosWithContent"
import { AxiosResponse } from "axios"

export async function GetWishList(): Promise<AxiosResponse<any>>{
    return await axios.get("/api/customer/wishlist");
}
 
export async function AddDeleteToWishList(id:string): Promise<AxiosResponse<any>>{
    return await axios.post(`/api/customer/wishlist?product_id=${id}`);
}
