import React from "react";
import { Link } from "react-router-dom";

import MBLogo from "../assets/mb.svg?react";

export const Head = () => {
  return (
    <header id="head">
      <Link to="/">
        <MBLogo id="mb-logo" />
      </Link>
    </header>
  );
};
