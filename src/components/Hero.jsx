import React, { useEffect } from "react";

import { List } from "./commons/List";

import { useImgUrl } from "../utils/useImgUrl";

export const Hero = ({ list }) => {
  const imgIndex = 7;
  const backImgUrl = useImgUrl(list[imgIndex].backdrop, "backdrop", "large");
  const imgUrl = useImgUrl(list[imgIndex].img, "poster", "large");

  return (
    <div id="hero" style={{ "--back_img_url": `url("${backImgUrl}")` }}>
      <img src={imgUrl} className="hero-img" />

      <List data={list} boxClass={"hero-list-container"} />
    </div>
  );
};
