import React, { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export const ResetScroll = ({ children, element }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    if (element) element.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location]);

  return <>{children}</>;
};
