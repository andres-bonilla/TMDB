import React from "react";

import { Tile } from "./Tile.jsx";

export const List = ({ data, boxClass, titleText = "", titleClass }) => {
  const mapResult = (list) =>
    list.map((item) => (
      <li key={item.mediaType + item.id} className="tile">
        <Tile item={item} />
      </li>
    ));

  return (
    <>
      {titleText && <h2 className={titleClass}>{titleText}</h2>}

      <div className={boxClass}>
        <ul className="list">{mapResult(data)}</ul>
      </div>
    </>
  );
};
