import axios from "./axiosWithContent";
import { AxiosResponse } from "axios";

export async function GetMainCategories_Talab(): Promise<AxiosResponse<any>> {
  return await axios.get(`/talab/categories/main`);
}

export async function GetSubCategories_Talab(
  id: string
): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/talab/categories/main/${id}`);
}

export async function GetProducutsByCategoryId_Talab(
  id: string
): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/shop/talab/products/cat/${id}`);
}

export async function GetProductById_Talab(
  id: string
): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/shop/talab/products/${id}`);
}

// Cart ///////////////////

export async function GetAllProductsFromCard_Talab(): Promise<
  AxiosResponse<any>
> {
  return await axios.get("/api/shop/talab/cart");
}

export async function AddToCard_Talab(data: any): Promise<AxiosResponse<any>> {
  return await axios.post(`/api/shop/talab/cart`, data);
}

export async function UpdateQuantity_Talab(
  cart_id: string,
  count: string
): Promise<AxiosResponse<any>> {
  return await axios.post(
    `/api/shop/talab/cart/update-quantity/${cart_id}?quantity=${count}`
  );
}

// Order ////////////////

export async function ConfirmOrder_Talab(
  data: any
): Promise<AxiosResponse<any>> {
  return await axios.post(`/api/shop/talab/order/confirm-order`, data);
}

export async function GetAllOrders_Talab(): Promise<AxiosResponse<any>> {
  return await axios.get("/api/shop/talab/order");
}

export async function GetOrderById_Talab(
  order_id: string
): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/shop/talab/order/${order_id}`);
}

export async function CancelledOrder_Talab(
  order_id: string,
  reason: string
): Promise<AxiosResponse<any>> {
  return await axios.post(
    `/shop/talab/order/cancell-order/${order_id}?reason=${reason}`
  );
}
