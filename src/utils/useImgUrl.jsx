import React from "react";
import { useSelector } from "react-redux";

export const useImgUrl = (path) => {
  const urlBase = useSelector((state) => state.img);

  return urlBase.length !== 0 && path
    ? `${urlBase}${path}`
    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3PHMucJhoigq6aEtUEndZFifYoICA6VNXyg&usqp=CAU";
};
