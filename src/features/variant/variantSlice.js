import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  optionDetails: [],
};

const variantSlice = createSlice({
  name: "variant",
  initialState,
  reducers: {
    reset: (state) => {
      state.optionDetails = [];
    },
    setOptionDetails: (state, action) => {
      state.optionDetails = action.payload;
    },
    resetOptionDetails: (state, action) => {
      state.optionDetails = initialState.optionDetails;
    },
  },

  extraReducers: (builder) => {
    builder;
  },
});

export default variantSlice.reducer;
export const { reset, setOptionDetails, resetOptionDetails } =
  variantSlice.actions;
