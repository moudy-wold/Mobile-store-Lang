import { AxiosResponse } from "axios";
import axios from "./axiosWithContent";

type Product = {
  id: string;
  images: any;
  name: string;
  quantity: string;
  price: string;
  details: {};
  brand: string;
  description: string;
};
export async function GetProductsByCategory(
  id: string | null | number,
  page?: number
): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/shop/categories/p/${id}?page=${page}`);
}

export async function AddProduct(data: any): Promise<AxiosResponse<any>> {
  return await axios.post(`/api/shop/products`, data);
}

export async function DeleteProductById(
  id: string
): Promise<AxiosResponse<any>> {
  return await axios.delete(`/api/shop/products/${id}`);
}

export async function GetProductById(
  id: string | string[]
): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/shop/products/${id}`);
}

export async function EditProductById(
  id: string | string[],
  data: FormData
): Promise<AxiosResponse<any>> {
  return await axios.post(`/api/shop/products/update/${id}`, data);
}


// Ask Answer
export async function AddAnswer(
  question_id: string,
  answer: string
): Promise<AxiosResponse<any>> {
  return await axios.post(
    `/api/shop/products/answer-store?answer_id=${question_id}&answer=${answer}`
  );
}


export async function UpdateOfferProduct(
  id: string,
  is_on_offer: "0" | "1",
  discount_price?:string,
  offer_start_date?:string,
  offer_expiry_date?:string,
): Promise<AxiosResponse<any>> {
  return await axios.post(`/talab/products/update-offer/${id}?_method=patch&discount_price=${discount_price}&is_on_offer=${is_on_offer}&offer_start_date=${offer_start_date}&offer_expiry_date=${offer_expiry_date}`);
}

export async function GetAllOffresProducts(page?:number): Promise<AxiosResponse<any>> {
  return await axios.get(`/talab/products/has-offers?page=${page}`);
}

export async function DeleteProduct(id: string): Promise<AxiosResponse<any>> {
  return await axios.delete(`/talab/products/${id}`);
}





// For Customer

export async function GetProductByIdForCustomer(
  id: string | string[]
): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/front/products/show/${id}`);
}
export async function GetProductsByCategoryForCustomer(
  id: string | null | number,
  page?: number
): Promise<AxiosResponse<any>> {
  return await axios.get(`/api/front/products/category/${id}?page=${page}`);
}


// Ask Question
export async function AddQuestion(
  product_id: string,
  question: string
): Promise<AxiosResponse<any>> {
  return await axios.post(
    `/api/customer/product/question-store?product_id=${product_id}&question=${question}`
  );
}

// Add Review
export async function AddReview(
  product_id: string,
  rating: number,
  review: string, 
): Promise<AxiosResponse<any>> {
  return await axios.post(
    `/api/customer/product/review-store?product_id=${product_id}&rating=${rating}&review=${review}`
  );
}