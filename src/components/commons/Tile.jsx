import React from "react";
import { Link } from "react-router-dom";
import NoImg from "../../assets/no-img.svg?react";

export const Tile = ({ item }) => {
  return (
    <li className="tile">
      <NoImg className="m-img" />
      <h3 className="m-title">{item}</h3>
    </li>
  );
};
