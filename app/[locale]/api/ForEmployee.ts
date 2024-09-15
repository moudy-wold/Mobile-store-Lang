
import { AxiosResponse } from 'axios';
import axios from './axios';


export async function GetAllCustomerEmployees( page?:number): Promise<AxiosResponse<any>> {
    // return await axios.get(`/api/users?role=customer&skip=${skip}}&limit=${limit}`);
    return await axios.get(`/api/employee/users?page=${page}`);
  }
  
  
  
  
  export async function AddCustomerEmployees( data: object): Promise<AxiosResponse<any>> {
    return await axios.post(`/api/employee/users`, data);
  }
  
  
  export async function DeleteCustomerEmployees( id: string): Promise<AxiosResponse<any>> {
    return await axios.delete(`/api/employee/users/${id}`);
  }
  
  
  export async function GetCustomerByIdEmployees( id:string ): Promise<AxiosResponse<any>> {
    return await axios.get(`/api/employee/users/${id}`);
  }
  
  export async function GetCustomerByPhoneNumberEmployees( PhonerNumber:string ): Promise<AxiosResponse<any>> {
    return await axios.get(`/api/employee/users/${PhonerNumber}`);
  }
  
  
  
  export async function EditCustomerByIdEmployees( 
    id:string | string[] ,
      data: object
  ): Promise<AxiosResponse<any>> {
    return await axios.put(`/api/employee/users/${id}`,data);
  }
  
  
  

 

export async function AddServiceEmployee(data: any): Promise<AxiosResponse<any>> {
  return await axios.post(`/api/employee/repairServices`, data);
}

export async function GetAllServiceEmployee(id: string): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/employee/repairServices/user/${id}`);
}

export async function GetServiceByIdEmployee(id: string): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/employee/repairServices/${id}`);
}

export async function DeleteServiceEmployee(id: string): Promise<AxiosResponse<any>> {
  return await axios.delete(`/api/employee/repairServices/${id}`);
}

export async function EditeServiceByIdEmployee(
  id?: string,
  customerId?:string,
  data?: any
): Promise<AxiosResponse<any>> {
  return await axios.put(`/api/employee/repairServices/${id}?userId=${customerId}`, data);
}
export async function EditeStatusServiceByIdEmployee(
  id: string,
  userId:string,
  status: string
): Promise<AxiosResponse<any>> {
  return await axios.put(`/api/employee/repairServices/update-status/${id}?userId=${userId}&serviceStatus=${status}`);
}


