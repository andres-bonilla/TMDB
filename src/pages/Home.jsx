import React from "react";
import { List } from "../components/commons/List.jsx";
import { Hero } from "../components/Hero.jsx";
import { useAxios } from "../utils/useAxios.jsx";

export const Home = () => {
  const { loading, data } = useAxios({
    method: "get",
    url: `/api/data/top_lists`,
  });

  if (loading) return <p>Cargando...</p>;

  if (!data) return <p>404</p>;

  const mapTops = (tops) =>
    tops.map((item, i) => {
      if (i === 0) return;
      return (
        <List
          key={item.name + i}
          data={item.list}
          titleText={item.name}
          boxClass={"list-container"}
          titleClass={`l-title ${i === 1 ? "home-first" : ""}`}
        />
      );
    });

  return (
    <>
      <Hero list={data[0].list} />
      {mapTops(data)}
    </>
  );
};
