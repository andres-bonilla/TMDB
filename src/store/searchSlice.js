import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  words: "",
  endSpace: false,
  type: "any",
  page: 1,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch(state, action) {
      state.words = action.payload.words.replaceAll("+", " ");
      state.type = action.payload.type;
      state.page = action.payload.page;
    },
    setWords(state, action) {
      state.words = action.payload.replaceAll("+", " ");
      state.page = 1;
    },
    setEndSpace(state, action) {
      state.endSpace = action.payload;
    },
    setType(state, action) {
      state.type = action.payload;
      state.page = 1;
    },
    setPage(state, action) {
      state.page = Number(action.payload);
    },
    resetSearch(state) {
      state.words = "";
      state.type = "any";
      state.page = 1;
    },
  },
});

export const {
  setSearch,
  setWords,
  setEndSpace,
  setType,
  setPage,
  resetSearch,
} = searchSlice.actions;

export default searchSlice.reducer;
