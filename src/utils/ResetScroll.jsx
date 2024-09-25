import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ResetScroll = ({ children, element }) => {
  const location = useLocation();

  useEffect(() => {
    if (element) element.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location]);

  return <>{children}</>;
};
