import React from "react";
import { useSearchParams } from "react-router-dom";

export const useQuery = () => {
  const [query, setQuery] = useSearchParams();

  const setQueryType = (newType) => {
    setQuery((prev) => {
      const prevType = Object.keys(Object.fromEntries(prev.entries()))[0];
      const newQuery = {};

      newQuery[newType] = prev.get(prevType);
      newQuery["on"] = 1;

      return newQuery;
    });
  };

  const setQueryWords = (value) => {
    setQuery((prev) => {
      const prevType =
        Object.keys(Object.fromEntries(prev.entries()))[0] || "any";

      if (prev.get(prevType) === value) return prev;

      prev.set(prevType, value);
      prev.set("on", 1);

      return prev;
    });
  };

  const setQueryPage = (value) => {
    setQuery((prev) => {
      prev.set("on", value);

      return prev;
    });
  };

  return {
    query,
    setQueryType,
    setQueryWords,
    setQueryPage,
  };
};
