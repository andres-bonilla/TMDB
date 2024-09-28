import React, { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export const useQuery = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  useEffect(() => {
    const queryType = Object.keys(Object.fromEntries(query.entries()))[0];

    if (!query.get(queryType) && location.pathname.indexOf("search") !== -1)
      navigate(`/search`);
  }, [query]);

  return {
    query,
    setQueryType,
    setQueryWords,
    setQueryPage,
  };
};
