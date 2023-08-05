import tmdbLogo from "../essets/tmdb_logo.svg";
import "../styles/footbar.css";

export const Footbar = () => {
  return (
    <div id="footbar">
      <label for="tmdb Logo">Powered by:</label>
      <a href="https://www.themoviedb.org" id="tmdb Logo">
        <img src={tmdbLogo} alt="TMDB" width={"170px"} />
      </a>
    </div>
  );
};
