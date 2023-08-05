import "../styles/results.css";
import React, { useEffect, useState } from "react";
import { Card } from "../commons/Card";
import { useSelector } from "react-redux";
import { CheckTabs } from "./CheckTabs";

export const Results = () => {
  const busqueda = useSelector((state) => state.result);

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
