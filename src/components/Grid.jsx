import React from "react";
import { Link } from "react-router-dom";

import { Tile } from "./commons/Tile.jsx";

export const Grid = ({ alles }) => {
  const mapResult = (list) => list.map((item) => <Tile item={item} />);

  return <ul id="grid">{mapResult(alles)}</ul>;
};
