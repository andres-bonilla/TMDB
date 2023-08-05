import React, { useEffect, useState } from "react";
import { Card } from "../commons/Card";
import { useSelector } from "react-redux";
import "../styles/results.css";

export const Results = () => {
  const busqueda = useSelector((state) => state.result);
  return (
    <div id="resultsBox">
      {busqueda.map((resultado) => {
        return <Card data={resultado} key={resultado.id} />;
      })}
    </div>
  );
};
