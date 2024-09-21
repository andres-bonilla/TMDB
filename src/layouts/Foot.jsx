import React from "react";

import tmdbLogo from "../assets/tmdb_logo.svg";

export const Foot = () => {
  return (
    <footer id="foot">
      <label id="label-tmdb" htmlFor="tmdb">
        Powered by:
      </label>
      <a id="tmdb" className="no-link-style" href="https://www.themoviedb.org">
        <img id="tmdb-logo" src={tmdbLogo} alt="TMDB" />
      </a>
    </footer>
  );
};
