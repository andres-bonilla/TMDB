import React from "react";
import { useSelector } from "react-redux";

import noImg from "../assets/no-img.svg";

export const useImgUrl = (path, type, width) => {
  const sizeWidths = {
    poster: { small: 1, medium: 3, large: 5 },
    profile: { small: 1, medium: 2, large: 3 },
    backdrop: { small: 0, medium: 1, large: 2 },
    logo: { small: 1, medium: 3, large: 5 },
    still: { small: 0, medium: 1, large: 2 },
  };

  const { secureUrl, sizes } = useSelector((state) => state.img);

  const size = sizeWidths[type][width];

  return secureUrl && path ? `${secureUrl}${sizes[type][size]}${path}` : noImg;
};
