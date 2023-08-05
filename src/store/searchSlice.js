import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageData: [],
  page: 1,
  maxElementsGrid: 20,
  status: "idle",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setMaxElementsGrid(state, action) {
      state.maxElementsGrid = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getResult.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getResult.fulfilled, (state, action) => {
        state.pageData = action.payload.data;
        state.page = action.payload.page;
        state.status = "idle";
      })
      .addCase(getResult.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

const searchIndex = (reqPage, maxElements) => {
  const initial = (maxElements * (reqPage - 1)) % 20;
  let initialPage = Math.ceil((maxElements * (reqPage - 1)) / 20);
  initialPage = initialPage === 0 ? 1 : initialPage;
  const numOfPages = Math.ceil((maxElements / 20) * reqPage - initialPage);

  return { initial, initialPage, numOfPages };
};

export const getResult = createAsyncThunk(
  "search/get",
  async (params, { getState }) => {
    const state = getState(),
      { mediaType, words, oldSearch, page } = params,
      { initial, initialPage, numOfPages } = searchIndex(
        page,
        state.search.maxElementsGrid
      );

    let result = [],
      data = {};

    for (let i = 0; i < numOfPages + 1; i++) {
      data = await axios.get(
        `/api/search/${mediaType}?by_words=${words}&page=${initialPage + i}`,
        {
          signal: oldSearch ? oldSearch.signal : null,
        }
      );
      result = result.concat(data.data);
    }

    return {
      page,
      data: result.slice(initial, state.search.maxElementsGrid + initial),
    };
  }
);

export const { setMaxElementsGrid } = searchSlice.actions;

export default searchSlice.reducer;
