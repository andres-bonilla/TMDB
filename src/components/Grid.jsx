import React from "react";

import { Tile } from "./commons/Tile.jsx";

export const Grid = ({ data }) => {
  const mapResult = (list) =>
    list.map((item, i) => (
      <li key={item.mediaType + item.id + i} className="tile">
        <Tile item={item} />
      </li>
    ));

  return <ul id="grid">{mapResult(data)}</ul>;
};
