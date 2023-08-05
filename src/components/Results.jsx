import "../styles/results.css";
import React, { useEffect, useState } from "react";
import { Card } from "../commons/Card";
import { useDispatch, useSelector } from "react-redux";
import { CheckTabs } from "./CheckTabs";
import { Link } from "react-router-dom";
import { setMaxElementsGrid } from "../store/searchSlice";

export const Results = () => {
  const dispatch = useDispatch();

  const [columnsNumber, setColumnsNumber] = useState(0);

  const search = useSelector((state) => state.search);

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
  }, [columnsNumber]);

  // const [numColumns, setNumColumns] = useState("1");
  // useEffect(() => {
  //   const element = document.getElementById("resultsGrid");
  //   const gridComputedStyle = document.defaultView.getComputedStyle(element);

  //   // get number of grid rows
  //   const gridRowCount = gridComputedStyle
  //     .getPropertyValue("grid-template-rows")
  //     .split(" ").length;
  //   // get number of grid columns
  //   const gridColumnCount = gridComputedStyle
  //     .getPropertyValue("grid-template-columns")
  //     .split(" ").length;
  //   setNumColumns(gridColumnCount);
  //   console.log(gridRowCount, gridColumnCount);
  // }, [busqueda]);
  if (search.status === "pending") return <p>Loading...</p>;

  if (search.status === "rejected") return <h1>Too FAST</h1>;

  return (
    <div id="resultsBox">
      <CheckTabs />
      <div id="resultsGrid">
        {search.actualPage.map((resultado) => {
          return <Card data={resultado} key={resultado.id} />;
        })}
      </div>
    </div>
  );
};
