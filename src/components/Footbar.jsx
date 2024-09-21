import "../styles/footbar.css";
import React from "react";
import tmdbLogo from "../assets/tmdb_logo.svg";

export const Footbar = () => {
  return (
    <footer id="footbar">
      <label htmlFor="tmdb Logo">Powered by:</label>
      <a href="https://www.themoviedb.org" id="tmdb Logo">
        <img src={tmdbLogo} alt="TMDB" width={"170px"} />
      </a>
    </footer>
  );
};
