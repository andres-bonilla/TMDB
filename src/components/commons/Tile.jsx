import React from "react";
import { Link } from "react-router-dom";

import { useImgUrl } from "../../utils/useImgUrl";

import NoImg from "../../assets/no-img.svg?react";

export const Tile = ({ item }) => {
  const imgUrl = useImgUrl(
    item.img,
    item.mediaType === "person" ? "profile" : "poster",
    item.mediaType === "person" ? 2 : 3
  );

  const linkUrl = `/details/${item.mediaType}/${item.id}`;

  return (
    <Link to={linkUrl} className="no-link-style tile-link">
      {imgUrl === "No image" ? (
        <NoImg className="m-img" />
      ) : (
        <img src={imgUrl} alt={item.name} className="m-img" />
      )}

      <h3 className="m-title">{item.name}</h3>
    </Link>
  );
};
