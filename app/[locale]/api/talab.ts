import axios from "./axiosWithContent";
import { AxiosResponse } from "axios";

// Main Categories
export async function GetMainCategories_Talab(): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/talab/categories/main`);
}

// Sub Categories By Main Id
export async function GetSubCategoriesByMainId_Talab(
  id: string
): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/talab/categories/main/${id}`);
}

// Get Sub Categories By Main Slug
export async function GetSubCategoriesByMainSlug_Talab(
  slug: string
): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/talab/categories/main/slug/${slug}`);
}

// Get Offer Products
export async function GetOfferProducts_Talab(
  slug: string
): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/talab/products/cat/`);
}

// Get Product By SubCate Id
export async function GetProductsBySubCateId_Talab(
  id: string,
  page?:number
): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/shop/talab/products/cat/${id}?page=${page}`);
}

// Get Product By Id
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

export async function AddToCard_Talab(
  product_id: any,
  quantity: any,
  details: any
): Promise<AxiosResponse<any>> {
  console.log(details);
  return await axios.post(
    `/api/shop/talab/cart?product_id=${product_id}&quantity=${quantity}&details=${details}`
  );
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

export async function GetAllOrders_Talab(page:number): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/shop/talab/order?page=${page}`);
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
    `/api/shop/talab/order/cancell-order/${order_id}?reason=${reason}`
  );
}
