import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

 
const initialState = {
  managementDetails: [],
};

const variantSlice = createSlice({
  name: "variant",
  initialState,
  reducers: {
    reset: (state) => {
      state.managementDetails = [];
    },
    setManagementDetails: (state, action) => {
      state.managementDetails = action.payload;
    },
    resetOptionDetails:(state,action)=>{
     state.managementDetails = initialState.managementDetails 
    }
  },

  extraReducers: (builder) => {
    builder;
  },
});

export default variantSlice.reducer;
export const { reset, setManagementDetails, resetOptionDetails } =
  variantSlice.actions;
