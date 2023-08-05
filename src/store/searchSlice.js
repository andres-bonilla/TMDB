import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  words: "",
  mediaType: "any",
  page: 1,
  pageData: [],
  maxElementsGrid: 20,
  status: "idle",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchWords(state, action) {
      state.words = action.payload;
      state.page = 1;
    },
    setMediaType(state, action) {
      state.mediaType = action.payload;
      state.page = 1;
    },
    setMaxElementsGrid(state, action) {
      state.maxElementsGrid = action.payload;
    },
    nextPage(state, action) {
      state.page = state.page + 1;
    },
    prevPage(state, action) {
      state.page = state.page - 1;
    },
    resetSearch(state, action) {
      state.words = "";
      state.mediaType = "any";
      state.page = 1;
      state.pageData = [];
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getResult.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getResult.fulfilled, (state, action) => {
        const { words, type, page } = action.payload.search;
        state.words = words || state.words;
        state.mediaType = type || state.mediaType;
        state.page = +page || state.page;
        state.pageData = action.payload.data;
        state.status = "idle";
      })
      .addCase(getResult.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const getResult = createAsyncThunk(
  "search/get",
  async ({ oldSearch, words, type, page }, { getState }) => {
    const { maxElementsGrid } = getState().search;

    const apiSearch = `/api/search/${type}?by_words=${words}`;

    const { initial, initialPage, numOfPages } = searchIndex(
      +page,
      maxElementsGrid
    );

    let result = [],
      data = {};

    for (let i = 0; i < numOfPages + 1; i++) {
      data = await axios.get(`${apiSearch}&on_page=${initialPage + i}`, {
        signal: oldSearch ? oldSearch.signal : null,
      });
      result = result.concat(data.data);
    }

    return {
      data: result.slice(initial, maxElementsGrid + initial),
      search: {
        words: words,
        type: type,
        page: +page,
      },
    };
  }
);

const searchIndex = (reqPage, maxElements) => {
  let initialPage = Math.ceil((maxElements * (reqPage - 1)) / 20);
  initialPage = initialPage === 0 ? 1 : initialPage;

  const numOfPages = Math.ceil((maxElements / 20) * reqPage - initialPage);
  const initial = (maxElements * (reqPage - 1)) % 20;

  return { initial, initialPage, numOfPages };
};

export const {
  setSearchWords,
  setMediaType,
  setMaxElementsGrid,
  nextPage,
  prevPage,
  resetSearch,
} = searchSlice.actions;

export default searchSlice.reducer;
