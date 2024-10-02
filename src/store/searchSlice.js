import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  words: "",
  type: "any",
  page: 1,
  index: { first: 0, last: 0 },
  limit: 0,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setWords(state, action) {
      state.words = action.payload;
      state.index.first = 0;
      state.index.last = 0;
      console.log([0, 0]);
    },
    setType(state, action) {
      state.type = action.payload;
      state.index.first = 0;
      state.index.last = 0;
      console.log([0, 0]);
    },
    setPage(state, action) {
      if (
        Math.abs(state.page) + 1 !== action.payload &&
        Math.abs(state.page) - 1 !== action.payload
      ) {
        state.index.first = 0;
        state.index.last = 0;
        console.log([0, 0]);
      }

      const fitter = Math.abs(state.page) - 1 === action.payload ? -1 : 1;

      state.page = fitter * action.payload;
    },
    setIndex(state, action) {
      console.log(action.payload);
      state.index = action.payload;
    },
    setLimit(state, action) {
      state.limit = action.payload;
    },
  },
});

export const { setWords, setType, setPage, setIndex, setLimit } =
  searchSlice.actions;

export default searchSlice.reducer;
