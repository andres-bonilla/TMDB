import React from "react";
import { useSelector } from "react-redux";

export const useImgUrl = (path, type, size) => {
  const { secureUrl, sizes } = useSelector((state) => state.img);

  return secureUrl && path
    ? `${secureUrl}${sizes[type][size]}${path}`
    : "No image";
};
