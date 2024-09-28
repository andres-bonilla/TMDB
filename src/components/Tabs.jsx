import React from "react";
import { useSelector } from "react-redux";

import { useQuery } from "../utils/useQuery";

export const Tabs = () => {
  const type = useSelector((state) => state.search.type);
  const { setQueryType } = useQuery();
  const tabTypes = {
    eng: ["any", "movie", "tv", "person"],
    esp: ["Todo", "Pelicula", "TV", "Persona"],
  };

  const checkHandler = ({ checked }, name) => {
    let value = checked ? name : "any";

    if (type === "tv" && checked && name === "movie") value = "movie_or_tv";
    if (type === "movie" && checked && name === "tv") value = "movie_or_tv";

    if (type === "movie_or_tv" && !checked && name === "tv") value = "movie";
    if (type === "movie_or_tv" && !checked && name === "movie") value = "tv";

    setQueryType(value);
  };

  return (
    <header id="tabs">
      {tabTypes.eng.map((tab, i) => {
        return (
          <label key={i} className="tab">
            <input
              onChange={(e) => checkHandler(e.target, tab)}
              checked={type.indexOf(tab) !== -1}
              type="checkbox"
              name={tab}
            />
            <span>{tabTypes.esp[i]}</span>
          </label>
        );
      })}
    </header>
  );
};
