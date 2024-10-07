import React from "react";
import { Link } from "react-router-dom";

import { useImgUrl } from "../../utils/useImgUrl";

export const Tile = ({ item }) => {
  const imgUrl = useImgUrl(
    item.img,
    item.mediaType === "person" ? "profile" : "poster",
    "medium"
  );

  const linkUrl = `/details/${item.mediaType}/${item.id}`;

  return (
    <Link to={linkUrl} className="no-link-style tile-link">
      <img src={imgUrl} alt={item.name} className="m-img" />

      <h3 className="m-title">{item.name}</h3>
    </Link>
  );
};
