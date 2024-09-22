import React from "react";
import { Link } from "react-router-dom";
import { List } from "../components/commons/List.jsx";
import { Hero } from "../components/Hero.jsx";
import { useAxios } from "../utils/useAxios.jsx";

export const Home = ({ alles }) => {
  const { loading, data, err } = useAxios({
    method: "get",
    url: `/api/data/top_lists`,
  });

  const mapTops = (tops) =>
    tops.map((list) => {
      return (
        <>
          <h2 className="l-title">Nuevos</h2>
          <div className="list-container">
            <List data={list} />
          </div>
        </>
      );
    });
  return !loading ? (
    <>
      <Hero ima={data[0][4].backdrop} />
      {mapTops(data)}
    </>
  ) : (
    <></>
  );
};
