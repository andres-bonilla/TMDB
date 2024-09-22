import React from "react";
import { Link } from "react-router-dom";
import NoImg from "../../assets/no-img.svg?react";
import { useImgUrl } from "../../utils/useImgUrl";

export const Tile = ({ item }) => {
  const imgUrl = useImgUrl(item.img);

  return (
    <Link
      to={`/details/${item.mediaType}/${item.id}`}
      className="no-link-style tile-link"
    >
      {item && item.img ? (
        <img src={imgUrl} alt={item.name} className="m-img" />
      ) : (
        <NoImg className="m-img" />
      )}
      <h3 className="m-title">{item.name}</h3>
    </Link>
  );
};
