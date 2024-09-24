import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export const Search = () => {
  const [words, setWords] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.indexOf("search/") !== -1) {
      setWords(location.pathname.split("/")[3].replaceAll("%20", " "));
    } else {
      setWords("");
    }
  }, [location]);

  const navControl = (e) => {
    e.preventDefault();

    if (!e.target.value) {
      navigate(`/search`);
      return;
    }

    if (words === e.target.value) return;

    navigate(`/search/any/${e.target.value.replaceAll(/ /g, "%20")}/on/1`);
  };

  return (
    <form id="search-form" target="search" onSubmit={navControl}>
      <input
        id="search"
        onChange={navControl}
        value={words}
        type="text"
        name="words"
        placeholder="Search..."
      />
    </form>
  );
};
