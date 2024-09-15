import axios from "./axios";
import { AxiosResponse } from "axios";

export async function SendMessage(data: object): Promise<AxiosResponse<any>> {
  return await axios.post(`/api/messages`, data);
}
 

export async function GetMessage(id?: string): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/messages?user=${id}&skip=0&limit=1000`);
}
export async function GetUsers(): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/messages/users?skip=0&limit=1000`);
}
