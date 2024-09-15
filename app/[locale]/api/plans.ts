import { AxiosResponse } from 'axios';
import axios from './axios';


export async function GetAllPlans(): Promise<AxiosResponse<any>> {
    return await axios.get(`/api/website/plans`);
  }

export async function UpdatePlane(data:any): Promise<AxiosResponse<any>> {
    return await axios.post(`/api/website/_confirm_plan_request_update` , data);
  }

export async function GetPaymentMethod(): Promise<AxiosResponse<any>> {
    return await axios.get(`/api/website/payment-methods` );
  }


  