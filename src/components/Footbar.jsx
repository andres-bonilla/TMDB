import tmdbLogo from "../essets/tmdb_logo.svg";

export const Footbar = () => {
  return (
    <div>
      <label>
        Powered by:
        <a href="https://www.themoviedb.org">
          <img src={tmdbLogo} alt="TMDB" width={"125px"} />
        </a>
      </label>
    </div>
  );
};
