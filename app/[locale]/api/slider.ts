import { AxiosResponse } from "axios";
import axios from "./axiosWithContent";

export type Slider = {
  data: {
    _id: string;
    fileName: string;
    image: string;
    fileTitle: string;
    title: string;
    type: string;
    createdAt: string;
    updatedAt: string;
  }[];
};

// FOR ADMINS
export async function GetMainSlider(): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/sliders?type=main`);
}
export async function GetBranchSlider(): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/sliders?type=branch`);
}

export async function AddSlider(data: FormData): Promise<AxiosResponse<any>> {
  return await axios.post(`/api/sliders`, data);
}

export async function DeleteSlider(id: string): Promise<AxiosResponse<any>> {
  return await axios.delete(`/api/sliders/${id}`);
}

export async function GetSliderById(
  id: string | string[]
): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/sliders/show/${id}`);
}

export async function EditSliderById(
  id: string | string[],
  data: FormData
): Promise<AxiosResponse<any>> {
  return await axios.put(`/api/sliders/${id}`, data);
}

// FOR CUSTOMERS
export async function GetMainSliderForCustomer(): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/front/slider?type=manin'`);
}
export async function GetBranchSliderForCustomer(): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/front/slider?type=branch'`);
}