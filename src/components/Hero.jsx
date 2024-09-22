import React from "react";
import { useImgUrl } from "../utils/useImgUrl";

export const Hero = ({ ima }) => {
  const imgUrl = useImgUrl(ima);

  return (
    <div id="hero">
      <img src={imgUrl} className="hero-img" />
    </div>
  );
};
