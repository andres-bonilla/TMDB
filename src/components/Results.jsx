import "../styles/results.css";
import React, { useEffect, useState } from "react";
import { Card } from "../commons/Card";
import { useSelector } from "react-redux";
import { CheckTabs } from "./CheckTabs";
import { Link } from "react-router-dom";

export const Results = () => {
  const busqueda = useSelector((state) => state.result);

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

  return (
    <div id="resultsBox">
      <CheckTabs />
      <div id="resultsGrid">
        {busqueda.map((resultado) => {
          return <Card data={resultado} key={resultado.id} />;
        })}
      </div>
    </div>
  );
};
