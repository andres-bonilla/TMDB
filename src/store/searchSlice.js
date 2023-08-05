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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getResult.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getResult.fulfilled, (state, action) => {
        state.pageData = action.payload;
        state.status = "idle";
      })
      .addCase(getResult.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const getResult = createAsyncThunk(
  "search/get",
  async ({ oldSearch }, { getState }) => {
    const { search } = getState(),
      address = `/api/search/${search.mediaType}?by_words=${search.words}`;

    const { initial, initialPage, numOfPages } = searchIndex(search);

    let result = [],
      data = {};

    for (let i = 0; i < numOfPages + 1; i++) {
      data = await axios.get(`${address}&page=${initialPage + i}`, {
        signal: oldSearch ? oldSearch.signal : null,
      });
      result = result.concat(data.data);
    }

    return result.slice(initial, search.maxElementsGrid + initial);
  }
);

const searchIndex = ({ page: reqPage, maxElementsGrid: maxElements }) => {
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
} = searchSlice.actions;

export default searchSlice.reducer;
