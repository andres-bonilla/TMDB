import { createAction, createReducer } from "@reduxjs/toolkit";

export const setMType = createAction("MTYPE");

export const mediaType = createReducer("any", {
  [setMType]: (state, action) => action.payload,
});
