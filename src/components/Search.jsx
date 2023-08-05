import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchWords } from "../store/searchSlice";

export const Search = () => {
  const dispatch = useDispatch();

  const search = useSelector((state) => state.search);

  const writeHandler = (e) => {
    e.preventDefault();
    if (search.words === e.target.value) return;
    if (!e.target.value) return;
    dispatch(setSearchWords(e.target.value.replace(/ /g, "%20")));
  };

  return (
    <div id="searchForm">
      <form onSubmit={writeHandler}>
        <input
          onChange={writeHandler}
          value={search.words}
          type="text"
          name="words"
        />
      </form>
    </div>
  );
};
