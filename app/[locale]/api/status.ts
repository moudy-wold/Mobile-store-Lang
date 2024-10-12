import axios from "./axiosWithContent"
import { AxiosResponse } from "axios"

type Status = {
    _id: number,
    image: string,
    title: string,
    description: string
  }

export async function GetAllStatuss(): Promise<AxiosResponse<any>>{
    return await axios.get("/api/shop/status");
}
 
export async function AddStatus(data:FormData): Promise<AxiosResponse<any>>{
    return await axios.post("/api/shop/status",data);
}


export async function GetStatusById(id:string) : Promise<AxiosResponse<any>>{
    return await axios.get(`/api/shop/status/${id}`)
}


export async function EditStatusById(id:string,data:FormData) : Promise<AxiosResponse<any>>{
    return await axios.post(`/api/shop/status/update/${id}`,data)
}


export async function DeleteStatus(id:string): Promise<AxiosResponse<any>>{
    return await axios.delete(`/api/shop/status/${id}`)
}


// FOR Customer

export async function GetAllStatussForCustomer(): Promise<AxiosResponse<any>>{
    return await axios.get("/api/front/status");
}
 