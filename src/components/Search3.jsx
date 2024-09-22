import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const Search = () => {
  const navigate = useNavigate();

  const [words, setWords] = useState("");
  const wordsHandler = (e) => {
    e.preventDefault();
    if (words === e.target.value) return;
    setWords(e.target.value);
    if (!e.target.value) return;
    navigate(`/search/any/${e.target.value.replace(/ /g, "%20")}`);
  };

  return (
    <form id="search-form" target="search3" onSubmit={wordsHandler}>
      <input
        id="search3"
        onChange={wordsHandler}
        value={words}
        type="text"
        name="words"
        placeholder="Search..."
      />
    </form>
  );
};
