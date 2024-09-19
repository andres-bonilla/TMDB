import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "../styles/search.css";

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

  return <></>;
};
