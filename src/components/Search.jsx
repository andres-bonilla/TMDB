import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getResult, setSearchWords } from "../store/searchSlice";

export const Search = () => {
  const navigate = useNavigate(),
    dispatch = useDispatch();

  // let { type, words, page } = useParams();

  // const [oldSearch, setOldSearch] = useState(null);
  const search = useSelector((state) => state.search);

  useEffect(() => {
    if (search.words && search.words[search.words.length - 1] !== " ") {
      navigate(`/search/${search.mediaType}/${search.words}/on/${search.page}`);
    }
  }, [search.words, search.mediaType, search.page, search.maxElementsGrid]); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   console.log(page);
  //   setOldSearch(new AbortController());
  //   dispatch(getResult({ oldSearch }));

  //   return () => {
  //     if (words.length > 1 && oldSearch) oldSearch.abort();
  //   };
  // }, [words, type, page, search.maxElementsGrid]); // eslint-disable-line react-hooks/exhaustive-deps

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
