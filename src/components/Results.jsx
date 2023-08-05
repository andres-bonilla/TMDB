import "../styles/results.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getResult, setMaxElementsGrid } from "../store/searchSlice";
import { PageSelector } from "./PageSelector";
import { Card } from "../commons/Card";
import { CheckTabs } from "./CheckTabs";
import { useParams } from "react-router";

export const Results = () => {
  const { type, words, page } = useParams();

  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);

  const [columnsNumber, setColumnsNumber] = useState(0);
  const [oldSearch, setOldSearch] = useState(null);

  useEffect(() => {
    const handleColumnsNumber = () => {
      const grid = document.getElementById("resultsGrid");
      const gridStyle = document.defaultView.getComputedStyle(grid);

      setColumnsNumber(
        gridStyle.getPropertyValue("grid-template-columns").split(" ").length
      );
    };

    window.addEventListener("resize", handleColumnsNumber);

    return () => {
      window.removeEventListener("resize", handleColumnsNumber);
    };
  }, []);

  useEffect(() => {
    const grid = document.getElementById("resultsGrid");
    const gridStyle = document.defaultView.getComputedStyle(grid);
    const columnCount = gridStyle
      .getPropertyValue("grid-template-columns")
      .split(" ").length;
    dispatch(setMaxElementsGrid(columnCount * 6));
  }, [columnsNumber]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setOldSearch(new AbortController());

    dispatch(getResult({ oldSearch, words, type, page }));

    return () => {
      if (words.length > 1 && oldSearch) oldSearch.abort();
    };
  }, [words, type, page]); // eslint-disable-line react-hooks/exhaustive-deps

  if (search.status === "pending") return <p>Loading...</p>;

  if (search.status === "rejected") return <h1>Too FAST</h1>;

  return (
    <div id="resultsBox">
      <CheckTabs />
      <div id="resultsGrid">
        {search.pageData.map((resultado, index) => {
          return (
            <Card
              data={resultado}
              media={search.mediaType}
              key={resultado.id * index}
            />
          );
        })}
      </div>
      <PageSelector />
    </div>
  );
};
