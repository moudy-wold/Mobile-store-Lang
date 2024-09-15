import axios from "./axiosWithContent"
import { AxiosResponse } from "axios"

type Status = {
    _id: number,
    image: string,
    title: string,
    description: string
  }

export async function GetAllStatuss(): Promise<AxiosResponse<any>>{
    return await axios.get("/api/status");
}
 
export async function AddStatus(data:FormData): Promise<AxiosResponse<any>>{
    return await axios.post("/api/status",data);
}


export async function GetStatusById(id:string) : Promise<AxiosResponse<any>>{
    return await axios.get(`/api/status/${id}`)
}


export async function EditStatusById(id:string,data:FormData) : Promise<AxiosResponse<any>>{
    return await axios.post(`/api/status/update/${id}`,data)
}


export async function DeleteStatus(id:string): Promise<AxiosResponse<any>>{
    return await axios.delete(`/api/status/${id}`)
}


// FOR Customer

export async function GetAllStatussForCustomer(): Promise<AxiosResponse<any>>{
    return await axios.get("/api/front/status");
}
 