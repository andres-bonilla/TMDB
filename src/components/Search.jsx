import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export const Search = () => {
  const navigate = useNavigate();

  const search = useSelector((state) => state.search);

  const [words, setWords] = useState("");

  useEffect(() => {
    setWords(search.words);
  }, [search.words]);

  const writeHandler = (e) => {
    e.preventDefault();
    if (search.words === e.target.value) return;
    if (!e.target.value) return;
    setWords(e.target.value.replace(/ /g, "%20"));
    navigate(
      `/search/${search.mediaType}/${e.target.value.replace(/ /g, "%20")}/on/${
        search.page
      }`
    );
  };

  return (
    <div id="searchForm">
      <form onSubmit={writeHandler}>
        <input onChange={writeHandler} value={words} type="text" name="words" />
      </form>
    </div>
  );
};
