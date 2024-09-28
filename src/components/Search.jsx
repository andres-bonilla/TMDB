import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { useQuery } from "../utils/useQuery";
import { setSearch } from "../store/searchSlice";

export const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [endSpace, setEndSpace] = useState(false);
  const { type, words } = useSelector((state) => state.search);
  const { query, setQueryWords } = useQuery();

  useEffect(() => {
    const queryType = Object.keys(Object.fromEntries(query.entries()))[0];

    dispatch(
      setSearch({
        words: query.get(queryType) || "",
        type: queryType || "any",
        page: query.get("on") || 1,
      })
    );
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
