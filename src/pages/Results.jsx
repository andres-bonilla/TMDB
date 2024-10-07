import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setIndex, setLimit } from "../store/searchSlice.js";

import { Tabs } from "../components/Tabs.jsx";
import { Grid } from "../components/Grid.jsx";
import { PageNav } from "../components/PageNav.jsx";

import { useGridLength } from "../utils/useGridLength.jsx";
import { useAxios } from "../utils/useAxios.jsx";

export const Results = () => {
  const dispatch = useDispatch();
  const length = useGridLength();
  const { type, words, page, index, limit } = useSelector(
    (state) => state.search
  );

  const { loading, data } = useAxios(
    {
      method: "get",
      url: !words
        ? ""
        : `/api/search/${type}?by_words=${words}&on_page=${page}&amount=${length}`,
      params: {
        tmdb_index:
          limit === length && page !== 1
            ? page < 0
              ? index.first
              : index.last
            : 0,
      },
    },
    true
  );

  useEffect(() => {
    if (!loading) {
      dispatch(
        setIndex(
          data && data.length
            ? { first: data[0].index, last: data[data.length - 1].index }
            : { first: 0, last: 0 }
        )
      );
      dispatch(setLimit(length));
    }
  }, [data]);

  if (!words) return <p>Haz una busqueda!</p>;

  if (loading) return <p>Cargando...</p>;

  if (!data || data.length === 0)
    return <p>No hay resultados para esta busqueda.</p>;

  return (
    <>
      <Tabs />
      <Grid data={data} />
      <PageNav noMore={data.length < length} />
    </>
  );
};
