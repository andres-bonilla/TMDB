import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getResult, loadResult } from "../store/searchSlice";

export const Search = () => {
  let [searchWords, setSearchWords] = useState(""),
    [oldSearch, setOldSearch] = useState(null);

  const navigate = useNavigate(),
    dispatch = useDispatch();

  const mediaType = useSelector((state) => state.mType);

  useEffect(() => {
    if (searchWords && searchWords[searchWords.length - 1] !== " ") {
      const words = searchWords.replace(/ /g, "%20");

      setOldSearch(new AbortController());

      dispatch(getResult({ mediaType, words, oldSearch }));

      navigate(`/search/${mediaType}?by_words=${words}`);

      // axios
      //   .get(`/api/search/${mediaType}?by_words=${words}`, {
      //     signal: oldSearch ? oldSearch.signal : null,
      //   })
      //   .then(({ data }) => {
      //     if (!data.error) dispatch(loadResult(data));
      //     navigate(`/search/${mediaType}?by_words=${words}`);
      //   })
      //   .catch((err) => {
      //     console.log(`Too FAST\n   Search of "${words}" is ${err.message}`);
      //   });

      return () => {
        if (searchWords.length > 1 && oldSearch) oldSearch.abort();
      };
    }
  }, [searchWords, mediaType]);

  const changeHandler = (e) => {
    e.preventDefault();
    if (searchWords === e.target.value) return;
    setSearchWords(e.target.value);
  };

  return (
    <div id="searchForm">
      <form onSubmit={changeHandler}>
        <input
          onChange={changeHandler}
          value={searchWords}
          type="text"
          name="words"
        />
      </form>
    </div>
  );
};
