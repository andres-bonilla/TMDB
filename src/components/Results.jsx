import "../styles/results.css";
import React, { useEffect, useState } from "react";
import { Card } from "../commons/Card";
import { useSelector } from "react-redux";
import { CheckTabs } from "./CheckTabs";
import { Link } from "react-router-dom";

export const Results = () => {
  const search = useSelector((state) => state.search);

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
        {search.data.map((resultado) => {
          return <Card data={resultado} key={resultado.id} />;
        })}
      </div>
    </div>
  );
};
