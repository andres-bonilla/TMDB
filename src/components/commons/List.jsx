import React, { useRef } from "react";

import { Tile } from "./Tile.jsx";
import { ResetScroll } from "../../utils/ResetScroll.jsx";

export const List = ({ data, boxClass, titleText = "", titleClass }) => {
  const boxRef = useRef(null);

  const mapResult = (list) =>
    list.map((item) => (
      <li key={item.mediaType + item.id} className="tile">
        <Tile item={item} />
      </li>
    ));

  return (
    <>
      {titleText && <h2 className={titleClass}>{titleText}</h2>}

      <ResetScroll element={boxRef.current}>
        <div className={boxClass} ref={boxRef}>
          <ul className="list">{mapResult(data)}</ul>
        </div>
      </ResetScroll>
    </>
  );
};
