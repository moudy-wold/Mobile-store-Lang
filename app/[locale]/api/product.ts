import { AxiosResponse } from "axios";
import axios from "./axiosWithContent";

type Product = {
  id: string;
  images: any;
  name: string;
  quantity: string;
  price: string;
  details: {};
  brand: string;
  description: string;
};
export async function GetProductsByCategory(
  id: string | null | number,
  page?: number,
  
): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/categories/p/${id}?page=${page}`);
}
// `/api/products?category=${id}&skip=${skip}&limit=${limit}`

export async function AddProduct(data: any): Promise<AxiosResponse<any>> {
  return await axios.post(`/api/products`, data);
}


export async function DeleteProductById(id: string): Promise<AxiosResponse<any>> {
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
// return await axios.put(`/api/products/${id}`, data);


// For Customer
 
export async function GetProductByIdForCustomer(
  id: string | string[]
): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/front/products/show/${id}`);
}
  export async function GetProductsByCategoryForCustomer(
    id: string | null | number,
    page?: number,
  
  ): Promise<AxiosResponse<any>> {
    return await axios.get(`/api/front/products/category/${id}?page=${page}`);
  }
 


