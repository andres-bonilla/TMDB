import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const imgSlice = createSlice({
  name: "img",
  initialState,
  reducers: {
    setImgData(state, action) {
      return action.payload;
    },
  },
});

export const { setImgData } = imgSlice.actions;

export default imgSlice.reducer;
