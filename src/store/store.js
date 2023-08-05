// STORE CREATION
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { urlImg } from "./img";
import { result } from "./result";

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    img: urlImg,
    result: result,
  },
});
