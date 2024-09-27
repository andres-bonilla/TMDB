import React from "react";
import { useLocation, useNavigate } from "react-router";
import { useQuery } from "../utils/useQuery";
import { useDispatch, useSelector } from "react-redux";
import { setEndSpace } from "../store/searchSlice";

export const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { setQueryWords } = useQuery();

  const { type, words, endSpace } = useSelector((state) => state.search);

  const wordsHandler = (e) => {
    e.preventDefault();
    let value = e.target.value;

    if (!value || value === " ") {
      navigate(`/search`);
      return;
    }

    dispatch(setEndSpace(value.endsWith(" ")));

    value = value.endsWith(" ") ? value.trim() : value;

    if (pathname.indexOf("search") !== -1) setQueryWords(value);
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
