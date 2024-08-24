import { AxiosResponse } from 'axios';
import axios from './axios';

export interface Admin {     
    _id:string,
    userName:string,
    phoneNumber:string,
    role: string;
    services: []
}
export async function GetAllEmployees(): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/employees`);
}

export async function AddEmployees( data: object): Promise<AxiosResponse<any>> {
  return await axios.post(`/api/employees`, data);
}

export async function DeleteEmployee( id: string): Promise<AxiosResponse<any>> {
  return await axios.delete(`/api/employees/${id}`);
}

export async function GetEmployeeById( id:string | string[]): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/employees/${id}`);
}

export async function EditEmployeeById( 
  id:string | string[] ,
    data: object
): Promise<AxiosResponse<any>> {
  return await axios.put(`/api/employees/${id}`,data);
}

