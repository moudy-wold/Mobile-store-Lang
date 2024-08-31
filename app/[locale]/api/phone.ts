import { AxiosResponse } from "axios";
import axios from "./axiosWithContent";
export interface Phone {
  id: string;
  img: string[];
  name: string;
  price: string;
  quantity: string;
  details: [
    { label: string; value: string }
    // screenType: string;
    // brand: string;
    // camera: string;
    // battery: string;
    // memory: string;
    // network: string;
    // ram: string;
    // headPhonePort:string;
    // operatingSystem:string;
    // numberOfSim: string;
    // warranty: string;
  ];
}
[];
export async function GetAllProduct(  page?: number): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/products?page=${page}`);
}

export async function AddProduct(data: any): Promise<AxiosResponse<any>> {
  return await axios.post(`/api/products`, data);
}

export async function DeleteProductById(
  id: string
): Promise<AxiosResponse<any>> {
  return await axios.delete(`/api/products/${id}`);
}

export async function GetProductById(
  id: string | string[]
): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/products/${id}`);
}

export async function EditProductById(
  id: string | string[],
  data: FormData
): Promise<AxiosResponse<any>> {
  return await axios.post(`/api/products/update/${id}`, data);
}

// For Customer

export async function GetProductByIdForCustomer(
  id: string | string[]
): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/front/products/show/${id}`);
}
