import React from "react";
import { ScrollRestoration, useParams } from "react-router-dom";

import { Grid } from "../components/Grid.jsx";

import { useAxios } from "../utils/useAxios.jsx";

export const Results = () => {
  const { type, words } = useParams();

  const { loading, data, err } = useAxios({
    method: "get",
    url: `/api/search/${type}?by_words=${words}&on_page=1`,
  });

  return !loading ? <Grid data={data} /> : <></>;
};
