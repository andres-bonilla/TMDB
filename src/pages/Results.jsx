import React from "react";

import { Tabs } from "../components/Tabs.jsx";
import { Grid } from "../components/Grid.jsx";
import { PageNav } from "../components/PageNav.jsx";

import { useAxios } from "../utils/useAxios.jsx";
import { useQuery } from "../utils/useQuery.jsx";
import { useSelector } from "react-redux";

export const Results = () => {
  const { type, words, page } = useSelector((state) => state.search);

  const { loading, data } = useAxios(
    {
      method: "get",
      url: !words
        ? ""
        : `/api/search/${type}?by_words=${words}&on_page=${page}`,
    },
    true
  );

  if (!words) return <p>Haz una busqueda!</p>;

  if (loading) return <p>Cargando...</p>;

  if (!data || data.length === 0)
    return <p>No hay resultados para esta busqueda.</p>;

  return (
    <>
      <Tabs />
      <Grid data={data} />
      <PageNav noMore={data.length < 36} />
    </>
  );
};
