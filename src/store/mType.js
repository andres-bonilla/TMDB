import { createSlice } from "@reduxjs/toolkit";

const initialState = "any";

export const mTypeSlice = createSlice({
  name: "mType",
  initialState,
  reducers: {
    setMType(state, action) {
      return action.payload;
    },
  },
});

export const { setMType } = mTypeSlice.actions;

export default mTypeSlice.reducer;
