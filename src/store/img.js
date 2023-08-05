import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

export const imgSlice = createSlice({
  name: "img",
  initialState,
  reducers: {
    setImg(state, action) {
      return action.payload;
    },
  },
});

export const { setImg } = imgSlice.actions;

export default imgSlice.reducer;
