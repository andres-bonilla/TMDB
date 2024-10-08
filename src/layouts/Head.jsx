import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Search } from "../components/Search";

import MBLogo from "../assets/mb.svg?react";

export const Head = () => {
  const location = useLocation();
  const [isFloat, setIsFloat] = useState(false);
  const [isDetails, setIsDetails] = useState(false);

  useLayoutEffect(() => {
    const handleScroll = () => {
      setIsFloat(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsDetails(location.pathname.indexOf("details") !== -1);
  }, [location]);

  return (
    <header
      id="head"
      className={isFloat && !isDetails ? "float with-shadow" : ""}
    >
      <Link to="/" className={isDetails ? "float" : ""}>
        <MBLogo id="mb-logo" />
      </Link>
      <Search isDetails={isDetails} />
    </header>
  );
};
