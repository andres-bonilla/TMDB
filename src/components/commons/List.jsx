import React from "react";
import { Link } from "react-router-dom";

import { Tile } from "./Tile.jsx";

export const List = ({ alles }) => {
  const mapResult = (list) => list.map((item) => <Tile item={item} />);

  return (
    <>
      <ul className="list">{mapResult(alles)}</ul>
    </>
  );
};
