import { AxiosResponse } from "axios";
import axios from "./axios";

type data = {
  userName: string;
  phoneNumber: string;
  address: string;
  note?: string;
  productId: string;
  details: {
    price: number;
    quantity: number;
    size: string;
  };
};

// Order From Customer
export async function GetAllOrderForCustomer(): Promise<AxiosResponse<any>> {
  return await axios.get("/api/customer/order");
}

export async function GetAllProductsFromCard(): Promise<AxiosResponse<any>> {
  return await axios.get("/api/customer/cart");
}

export async function AddToCard(data: any): Promise<AxiosResponse<any>> {
  return await axios.post(`/api/customer/cart`,data);
}

export async function UpdateQuantity(cart_id : string ,count:string): Promise<AxiosResponse<any>> {
  return await axios.post(`/api/customer/cart/update-quantity/${cart_id}?quantity=${count}`);
}

// Confirm Order From Customer
export async function ConfirmOrder(data: any): Promise<AxiosResponse<any>> {
  return await axios.post(`/api/customer/order/confirm-order`, data);
}

// Order From Admin
export async function GetAllOrders(): Promise<AxiosResponse<any>> {
  return await axios.get("/api/orders");
}

export async function GetAllOrdersForUserByUserId(id:string): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/orders?user_id=${id}`);
}

export async function DeleteOrder(id: string): Promise<AxiosResponse<any>> {
  return await axios.delete(`/api/orders/${id}`);
}

export async function EditOrderStatus(id: string,status:string): Promise<AxiosResponse<any>> {  
  return await axios.post(`/api/orders/update-status/${id}?status=${status}`);
}
