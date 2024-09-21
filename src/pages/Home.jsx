import React from "react";
import { Link } from "react-router-dom";
import { List } from "../components/commons/List.jsx";
import { Hero } from "../components/Hero.jsx";

export const Home = ({ alles }) => {
  return (
    <>
      <Hero />
      <h2 className="l-title home-first">Title</h2>
      <div className="list-container">
        <List alles={alles} />
      </div>
      <h2 className="l-title">Title</h2>
      <div className="list-container">
        <List alles={alles} />
      </div>
    </>
  );
};
