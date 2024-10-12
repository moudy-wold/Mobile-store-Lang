import { AxiosResponse } from 'axios';
import axios from './axios';
 

export async function GetGuidingImage(): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/shop/dashboard/banner-images-viewed`);
}

export async function AddGuidingImage( data: FormData): Promise<AxiosResponse<any>> {
  return await axios.post(`/api/shop/dashboard/add-banner-image`, data);
}

export async function DeleteEmployee( id: string): Promise<AxiosResponse<any>> {
  return await axios.delete(`/api/shop/dashboard/delete-banner-image/${id}`);
}


export async function EditGuidingImageById(id:string, data:FormData): Promise<AxiosResponse<any>>{
return await axios.post(`api/shop/dashboard/update-banner-image/${id}`,data)
}


// For Customer


export async function GetGuidingImageForCustomer(): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/front/banner-images`);
}