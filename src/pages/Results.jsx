import React from "react";
import { Link } from "react-router-dom";

import { Grid } from "../components/Grid.jsx";

export const Results = ({ alles }) => {
  return (
    <>
      <Grid alles={alles} />
    </>
  );
};
