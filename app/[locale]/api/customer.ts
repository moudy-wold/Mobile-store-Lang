import { AxiosResponse } from 'axios';
import axios from './axios';


export interface User {
  token: string,
  user: {
      userName: string,
      phoneNumber: string,
      role: "customer" |"admin",
      _id: string,
      services: [
          {
              _id: string
              userId: string,
              phoneType: string,
              serviceType: string,
              serviceCost: number,
              serviceCurrency: string,
              serviceStatus: "pending" |"active" |"refused" |"done",
              warantiDuration: string,
              createdAt: string,
              updatedAt: string,
              __v: 0
          },          
      ]
  }
}
export async function GetAllCustomer(page?:number): Promise<AxiosResponse<any>> {
  // return await axios.get(`/api/users?role=customer&skip=${skip}}&limit=${limit}`);
  return await axios.get(`/api/users?page=${page}`);
}
// return await axios.get(`/api/users?role=customer&skip=0&limit=10`);



export async function AddCustomer( data: object): Promise<AxiosResponse<any>> {
  return await axios.post(`/api/users`, data);
}


export async function DeleteCustomer( id: string): Promise<AxiosResponse<any>> {
  return await axios.delete(`/api/users/${id}`);
}

export async function GetCustomerById( id:string ): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/common/user/${id}`);
}

export async function GetCustomerByPhonreNumber( phoneNumber:string ): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/users/${phoneNumber}`);
}

export async function EditCustomerById( 
  id:string | string[] ,
    data: object
): Promise<AxiosResponse<any>> {
  return await axios.put(`/api/users/${id}`,data);
}


export async function GetCustomerByIdForCustomer(): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/customer`);
}