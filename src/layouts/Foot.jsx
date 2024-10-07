import React from "react";

import tmdbLogo from "../assets/tmdb_logo.svg";

export const Foot = () => {
  return (
    <footer id="foot">
      <span id="label-tmdb">Powered by:</span>
      <a id="tmdb" className="no-link-style" href="https://www.themoviedb.org">
        <img id="tmdb-logo" src={tmdbLogo} alt="TMDB" />
      </a>
    </footer>
  );
};
