import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export const Search = () => {
  const [words, setWords] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    if (path.indexOf("search/") === -1) {
      setWords("");
      return;
    }

    if (!words && path.split("/").length === 6 && path.split("/")[3]) {
      setWords(path.split("/")[3].replaceAll("%20", " "));
      return;
    }
    if (path.split("/").length === 6 && !path.split("/")[3]) {
      setWords("");
      navigate(`/search`);
      return;
    }
  }, [location]);

  const wordsHandler = (e) => {
    e.preventDefault();

    if (!e.target.value) {
      setWords("");
      navigate(`/search`);
      return;
    }

    setWords(e.target.value);
    navigate(`/search/any/${e.target.value.replaceAll(/ /g, "%20")}/on/1`);
  };

  return (
    <form id="search-form" target="search" onSubmit={wordsHandler}>
      <input
        id="search"
        onChange={wordsHandler}
        value={words}
        type="text"
        name="words"
        placeholder="Search..."
      />
    </form>
  );
};
