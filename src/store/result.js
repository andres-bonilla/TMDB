import { createAction, createReducer } from "@reduxjs/toolkit";

export const setResult = createAction("RESULT");

export const result = createReducer([], {
  [setResult]: (state, action) => action.payload,
});
