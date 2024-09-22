import React from "react";
import { Link } from "react-router-dom";

import { Tile } from "./commons/Tile.jsx";

export const Grid = ({ data }) => {
  const mapResult = (list) =>
    list.map((item) => (
      <li key={item.mediaType + item.id} className="tile">
        <Tile item={item} />
      </li>
    ));

  return <ul id="grid">{mapResult(data)}</ul>;
};
