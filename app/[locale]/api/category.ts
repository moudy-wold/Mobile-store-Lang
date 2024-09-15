import axios from "./axios"
import { AxiosResponse } from "axios"

export type Category ={
    _id: string,
    name: string,
    title: any,
    comparison: string
  
}
// FOR ADMINS

export async function GetAllCategories(): Promise<AxiosResponse<any>>{
    return await axios.get("/api/categories");
}
 
export async function AddCategory(name:object): Promise<AxiosResponse<any>>{
    return await axios.post("/api/categories",name);    
}


export async function GetCategoryById(id:string) : Promise<AxiosResponse<any>>{
    return await axios.get(`/api/categories/${id}`)
}


export async function EditCategoryById(id:string,obj:object) : Promise<AxiosResponse<any>>{
    return await axios.put(`/api/categories/${id}`,obj)
}


export async function DeleteCategory(id:string): Promise<AxiosResponse<any>>{
    return await axios.delete(`/api/categories/${id}`)
}
// FOR CUSTOMERS


export async function GetAllCategoriesForCustomer(): Promise<AxiosResponse<any>>{
    return await axios.get("/api/front/categories");
}