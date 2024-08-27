import { createSlice } from "@reduxjs/toolkit";
import { getAllCategories } from "./services/Categories";
import { getInfoRedux } from "./services/Info";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    burgerMenu: false,
    talker: {},
    talkerMsgs: [],
    currentMsg: "",
    sendedMsg: false,
    adminSidbar: false,
    categoryId: "",
    compareArray: [],
    changeWishListStatus: false,
    islogendRedux: false,
    isAdminRedux: false,
    isEdmployeeRedux: false,
    thereIsCopmare:false,
    card_System:false,
    repair_Service_System:false,    
  },
  reducers: {
    openBurgerMenu: (state) => {
      state.burgerMenu = true;
    },
    CloseBurgerMenu: (state) => {
      state.burgerMenu = false;
    },
    setTalker: (state, action) => {
      state.talker = action.payload;
    },
    setTalkerMsgs: (state, action) => {
      state.talkerMsgs = action.payload;
    },
    setCurrentMsg: (state, action) => {
      state.currentMsg = action.payload;
    },
    setSendedtMsg: (state, action) => {
      state.sendedMsg = action.payload;
    },
    setcategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    openAdminSidbar: (state) => {
      state.adminSidbar = true;
    },
    closeAdminSidbar: (state) => {
      state.adminSidbar = false;
    },
    setChangeWishListStatus: (state) => {
      state.changeWishListStatus = !state.changeWishListStatus;
    },
    setIsLogend: (state,action) => {
      state.islogendRedux = action.payload;
    },
    setIsAdmin: (state,action) => {
      state.isAdminRedux = action.payload;
    },
    setIsEmployee: (state,action) => {
      state.isEdmployeeRedux = action.payload;
    },
    setThereIsCopmare: (state,action) => {
      state.thereIsCopmare = action.payload;
    },
 
  },
  extraReducers: (builder) => {
    builder    
    // ================================= GetAllCategories ===========================
      .addCase(getAllCategories.pending, (state) => {})
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.thereIsCopmare = action.payload.data.data.some((item:any) => item.comparison == "1");        
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        console.log(action.error)        
      })
    // ================================== Get Info =======================================
    .addCase(getInfoRedux.pending, (state) => {})
    .addCase(getInfoRedux.fulfilled, (state, action) => {      
      state.card_System = action.payload.data?.plan_detils_limit?.enable_cart ? true : false
      state.repair_Service_System = action.payload.data?.plan_detils_limit?.enable_repair_service ? true : false      
    })
    .addCase(getInfoRedux.rejected, (state, action) => {
      console.log(action.error)        
    })
  },
});

export const {
  openBurgerMenu,
  CloseBurgerMenu,
  setTalker,
  openAdminSidbar,
  closeAdminSidbar,
  setTalkerMsgs,
  setCurrentMsg,
  setSendedtMsg,
  setcategoryId,
  setChangeWishListStatus,
  setIsLogend,
  setIsAdmin,
  setIsEmployee,
  setThereIsCopmare,
 
} = counterSlice.actions;

export default counterSlice.reducer;
