import axios from "./axiosWithContent"
import { AxiosResponse } from "axios"

 

export async function GetAllTicket(page?:number): Promise<AxiosResponse<any>>{
    return await axios.get(`/api/support-ticket?page=${page}`);
}
 
export async function SendNewTicket(data:FormData): Promise<AxiosResponse<any>>{
    return await axios.post("/api/support-ticket",data);
}


export async function GetTicketById(id:string) : Promise<AxiosResponse<any>>{
    return await axios.get(`/api/support-ticket/show/${id}`)
}


 

export async function SendREsponse(ticket_id:string,response:string): Promise<AxiosResponse<any>>{
    return await axios.post(`/api/support-ticket/response/${ticket_id}?response=${response}`)
}

 