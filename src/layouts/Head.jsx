import React from "react";
import { Link } from "react-router-dom";

import MBLogo from "../assets/mb.svg?react";
import { Search } from "../components/Search3";

export const Head = () => {
  return (
    <header id="head">
      <Link to="/">
        <MBLogo id="mb-logo" />
      </Link>
      <Search />
    </header>
  );
};
