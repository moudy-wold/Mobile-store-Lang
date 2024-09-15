import { createAsyncThunk } from "@reduxjs/toolkit";

import { GetAllTicket } from "../../api/ticket";
 
//---------------------------------------------------------------

// GET =>  GET ITEMS
export const getSupportTicket = createAsyncThunk(
  "supprt/message",
  async (params, thunkAPI) => {
    // console.log(params)
    try {
      const response = await GetAllTicket(1);
      return response;
    } catch (e:any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);


 