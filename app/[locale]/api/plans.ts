import { AxiosResponse } from 'axios';
import axios from './axios';


export async function GetAllPlans(): Promise<AxiosResponse<any>> {
    return await axios.get(`/api/website/plans`);
  }
  