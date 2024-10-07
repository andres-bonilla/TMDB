import React, { useLayoutEffect, useState } from "react";

export const useGridLength = () => {
  const getGridLength = () => {
    const limits = [950, 1250, 1650, 2040];
    const width = window.innerWidth;
    return (limits.findIndex((limit) => width <= limit) + 3) * 6;
  };

  const [gridLength, setGridLength] = useState(getGridLength());

  useLayoutEffect(() => {
    window.addEventListener("resize", () => {
      setGridLength(getGridLength());
    });

    return () =>
      window.removeEventListener("resize", () => {
        setGridLength(getGridLength());
      });
  }, []);

  return gridLength;
};
