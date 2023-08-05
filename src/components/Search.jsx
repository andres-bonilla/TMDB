import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getResult, setSearchWords } from "../store/searchSlice";

export const Search = () => {
  const navigate = useNavigate(),
    dispatch = useDispatch();

  const [oldSearch, setOldSearch] = useState(null);
  const search = useSelector((state) => state.search);

  useEffect(() => {
    if (search.words && search.words[search.words.length - 1] !== " ") {
      setOldSearch(new AbortController());
      dispatch(getResult({ oldSearch }));
      navigate(
        `/search/${search.mediaType}?by_words=${search.words}&on_page=${search.page}`
      );

      return () => {
        if (search.words.length > 1 && oldSearch) oldSearch.abort();
      };
    }
  }, [search.words, search.mediaType, search.maxElementsGrid, search.page]);

  const writeHandler = (e) => {
    e.preventDefault();
    if (search.words === e.target.value) return;
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
