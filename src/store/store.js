// STORE CREATION
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import imgReducer from "./img";
import searchReducer from "./searchSlice";
import userReducer from "./userSlice";

const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(logger);

export const store = configureStore({
  middleware,
  reducer: {
    user: userReducer,
    search: searchReducer,
    img: imgReducer,
  },
});
