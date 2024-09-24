import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAxios } from "../utils/useAxios.jsx";

import { Grid } from "../components/Grid.jsx";
import { PageNav } from "../components/PageNav.jsx";

export const Results = () => {
  let { type, words, page } = useParams();
  page = page === undefined ? 1 : page;

  const noParams = type === undefined || words === undefined;

  const apiSearchUrl = noParams
    ? ""
    : `/api/search/${type}?by_words=${words}&on_page=${page}`;

  const { loading, data, cancel } = useAxios({
    method: "get",
    url: apiSearchUrl,
  });

  if (noParams) return <p>Haz una busqueda!</p>;

  if (loading) return <p>Cargando...</p>;

  if (data && data.length === 0)
    return <p>No hay resultados para esta busqueda.</p>;

  return (
    <>
      <Grid data={data} />
      <PageNav
        url={`/search/${type}/${words}`}
        actualPage={Number(page)}
        noMore={data.length < 36}
      />
    </>
  );
};
