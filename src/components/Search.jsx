import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { setPage, setType, setWords } from "../store/searchSlice";

import { useQuery } from "../utils/useQuery";

export const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [endSpace, setEndSpace] = useState(false);
  const { type, words, page } = useSelector((state) => state.search);
  const { query, setQueryWords } = useQuery();

  useEffect(() => {
    const queryType = Object.keys(Object.fromEntries(query.entries()))[0];

    if (!query.get(queryType) && location.pathname.indexOf("search") !== -1)
      navigate(`/search`);

    const newWord = query.get(queryType)?.replaceAll("+", " ") || "";
    const newType = queryType || "any";
    const newPage = Number(query.get("on")) || 1;

    if (Math.abs(page) !== newPage) dispatch(setPage(newPage));
    else if (type !== newType || words !== newWord) dispatch(setPage(1));

    if (type !== newType) dispatch(setType(newType));

    if (words !== newWord) dispatch(setWords(newWord));
  }, [query]);

  const wordsHandler = (e) => {
    e.preventDefault();
    let value = e.target.value;

    if (!value || value === " ") {
      navigate(`/search`);
      return;
    }
    setEndSpace(value.endsWith(" "));
    value = value.endsWith(" ") ? value.trim() : value;

    if (location.pathname.indexOf("search") !== -1) setQueryWords(value);
    else navigate(`/search?${type}=${value}&on=1`);
  };

  return (
    <form id="search-form" target="search" onSubmit={wordsHandler}>
      <input
        id="search"
        onChange={wordsHandler}
        value={endSpace ? words + " " : words}
        type="text"
        name="words"
        placeholder="Search..."
      />
    </form>
  );
};
