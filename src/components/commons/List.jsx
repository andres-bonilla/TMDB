import React from "react";
import { Link } from "react-router-dom";

import { Tile } from "./Tile.jsx";

export const List = ({ data }) => {
  const mapResult = (list) =>
    list.map((item, i) => (
      <li key={i} className="tile">
        <Tile item={item} />
      </li>
    ));

  return (
    <>
      <ul className="list">{mapResult(data)}</ul>
    </>
  );
};
