import React from "react";
import { useQuery } from "../utils/useQuery";
import { useSelector } from "react-redux";

export const Tabs = () => {
  const { setQueryType } = useQuery();

  const type = useSelector((state) => state.search.type);

  const checkHandler = ({ checked }, name) => {
    let value = checked ? name : "any";

    if (type === "tv" && checked && name === "movie") value = "movie_or_tv";
    if (type === "movie" && checked && name === "tv") value = "movie_or_tv";

    if (type === "movie_or_tv" && !checked && name === "tv") value = "movie";
    if (type === "movie_or_tv" && !checked && name === "movie") value = "tv";

    setQueryType(value);
  };

  return (
    <>
      {["any", "movie", "tv", "person"].map((tab, i) => {
        return (
          <label key={i} className="tab">
            <input
              onChange={(e) => checkHandler(e.target, tab)}
              checked={type.indexOf(tab) !== -1}
              type="checkbox"
              name={tab}
            />
            <span>{tab}</span>
          </label>
        );
      })}
    </>
  );
};
