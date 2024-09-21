import React from "react";
import { Routes, Route } from "react-router";
import { Head } from "./layouts/Head.jsx";
import { Foot } from "./layouts/Foot.jsx";
import { Home } from "./pages/Home.jsx";
import { Results } from "./pages/Results.jsx";
import { Details } from "./pages/Details.jsx";

export const App = () => {
  const allesList = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  const alles = [
    "a",
    "b",
    "c",
    "El mundo perdido de Timmy",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
  ];
  return (
    <>
      <Head />

      <main id="content2">
        <Routes>
          <Route path="/" element={<Home alles={allesList} />} />
          <Route path="/search/*" element={<Results alles={alles} />} />
          <Route path="/details/" element={<Details alles={allesList} />} />
        </Routes>
      </main>

      <Foot />
    </>
  );
};
