import { createSlice } from "@reduxjs/toolkit";
import { getAllCategories } from "./services/Categories";
import { getInfoRedux } from "./services/Info";
import { getSupportTicket } from "./services/SupportTicket";

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
    infoData : {},
    card_System:false,
    repair_Service_System:false,
    day_14:false,
    ticketMessage:[],
    unReadMeessage:0,
    clickSidbar : false,
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
    setLast_14Day: (state,action) => {
      state.day_14 = action.payload;
    },
    setClickSidbar : (state,action) =>{
      state.clickSidbar  = !state.clickSidbar
    }
 
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
      state.infoData = action.payload.data;
      state.card_System = action.payload.data?.plan_detils_limit?.enable_cart ? true : false
      state.repair_Service_System = action.payload.data?.plan_detils_limit?.enable_repair_service ? true : false
    })
    .addCase(getInfoRedux.rejected, (state, action) => {
      console.log(action.error)        
    })

    // ================================== Get TicketMessage =======================================
    .addCase(getSupportTicket.pending, (state) => {})
    .addCase(getSupportTicket.fulfilled, (state, action) => {      
      
      state.ticketMessage = action.payload?.data?.data;
      state.unReadMeessage = action?.payload?.data?.unreadResponsesCount
      console.log(action?.payload?.data?.data)
    })
    .addCase(getSupportTicket.rejected, (state, action) => {
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
  setLast_14Day,
  setClickSidbar,
 
} = counterSlice.actions;

export default counterSlice.reducer;
