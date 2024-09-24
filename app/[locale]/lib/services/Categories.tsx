import { createAsyncThunk } from "@reduxjs/toolkit";

import { GetAllCategoriesForCustomer } from "@/app/[locale]/api/category";
 
//---------------------------------------------------------------

// GET =>  GET ITEMS
export const getAllCategories = createAsyncThunk(
  "items/getItems",
  async (params, thunkAPI) => {
    try {
      const response = await GetAllCategoriesForCustomer();
      return response;
    } catch (e:any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);


 