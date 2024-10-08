import { createAsyncThunk } from "@reduxjs/toolkit";

import { GetInfoForCustomer } from "@/app/[locale]/api/info";
 
//---------------------------------------------------------------

// GET =>  GET ITEMS
export const getInfoRedux = createAsyncThunk(
  "info/getInfo",
  async (params, thunkAPI) => {
    try {
      const response = await GetInfoForCustomer();
      return response;
    } catch (e:any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);


 