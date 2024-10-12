import axios from "./axios";
import { AxiosResponse } from "axios";
export type Infos = {
  _id: string;
  name: string;
  logo: { image: string; fileTitle: string; fileName: string };
  description: string;
  social: [{ name: string; icon: string; url: string }];
};

export async function CreateInfos(data: FormData): Promise<AxiosResponse<any>> {
  return await axios.post(`/api/shop/info`, data);
}

export async function GetInfo(): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/shop/info`);
}
 
export async function GetInfoForCustomer(): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/front/info`);
}