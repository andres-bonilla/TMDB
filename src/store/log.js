import { createAction, createReducer } from "@reduxjs/toolkit";

export const setLog = createAction("LOG");

export const logInOut = createReducer(false, {
  [setLog]: (state, action) => action.payload,
});
