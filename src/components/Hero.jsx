import React from "react";
import { useImgUrl } from "../utils/useImgUrl";
import { List } from "./commons/List";

export const Hero = ({ list }) => {
  const imgIndex = 7;
  const backImgUrl = useImgUrl(list[imgIndex].backdrop, "backdrop", 2);
  const imgUrl = useImgUrl(list[imgIndex].img, "poster", 4);

  return (
    <div id="hero" style={{ "--back_img_url": `url("${backImgUrl}")` }}>
      <img src={imgUrl} className="hero-img" />

      <List data={list} boxClass={"hero-list-container"} />
    </div>
  );
};
