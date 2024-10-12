import { AxiosResponse } from "axios";
import axios from "./axios";

type Service = {
  phoneType: string,
  serviceType: string,
  serviceStatus: string,
  serviceCost: string,
  serviceCurrency: string, //Will delete it
  warantiDuration: string,
}


export async function AddService(data: any): Promise<AxiosResponse<any>> {
  return await axios.post(`/api/shop/repairServices`, data);
}

export async function GetAllService(id: string): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/shop/repairServices/user/${id}`);
}

export async function GetServiceById(id: string): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/shop/repairServices/${id}`);
}

export async function DeleteService(id: string): Promise<AxiosResponse<any>> {
  return await axios.delete(`/api/shop/repairServices/${id}`);
}

export async function EditeServiceById(
  id?: string,
  customerId?:string,
  data?: any
): Promise<AxiosResponse<any>> {
  return await axios.put(`/api/shop/repairServices/${id}?userId=${customerId}`, data);
}
export async function EditeStatusServiceById(
  id: string,
  userId:string,
  status: string
): Promise<AxiosResponse<any>> {
  return await axios.put(`/api/shop/repairServices/update-status/${id}?userId=${userId}&serviceStatus=${status}`);
}
