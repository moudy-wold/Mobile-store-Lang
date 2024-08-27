import { createAsyncThunk } from "@reduxjs/toolkit";

import { GetInfo } from "@/app/[locale]/api/info";
 
//---------------------------------------------------------------

// GET =>  GET ITEMS
export const getInfoRedux = createAsyncThunk(
  "info/getInfo",
  async (params, thunkAPI) => {
    // console.log(params)
    try {
      const response = await GetInfo();
      return response;
    } catch (e:any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);


 