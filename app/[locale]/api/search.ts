import { AxiosResponse } from "axios";
import axios from "./axios";

export async function SearchProductsMethod(value: string): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/products?q=${value}&skip=0&limit=30`);
}

export async function SearchUsersMethod(value: string): Promise<AxiosResponse<any>> {  
  return await axios.get(`/api/users?role=customer&q=${value}`);
}

// For Admin

export async function SearchOnUserForAdmin(data:string): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/users?search=${data}`);
}

export async function SearchOnProductsForAdmin(id:string,data:string): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/categories/p/${id}?search=${data}`);
}

// For Empolyee
export async function SearchOnUserForEmployee(data:string): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/employee/users?search=${data}`);
}


  // For Customer

  export async function SearchProductsForCustomer( data:string ): Promise<AxiosResponse<any>> {
    return await axios.get(`/api/front/products?search=${data}`);
  }
  
