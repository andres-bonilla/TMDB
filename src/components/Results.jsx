import React, { useEffect, useState } from "react";
import { Card } from "../commons/Card";
import { useSelector } from "react-redux";

export const Results = () => {
  const busqueda = useSelector((state) => state.result);
  return (
    <div>
      {busqueda.map((resultado) => {
        return <Card data={resultado} key={resultado.id} />;
      })}
    </div>
  );
};
