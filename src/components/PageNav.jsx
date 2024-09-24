import React from "react";
import { useNavigate } from "react-router";

export const PageNav = ({ url, actualPage, noMore }) => {
  const navigate = useNavigate();

  return (
    <footer id="page-nav">
      <button
        className={`button ${actualPage === 1 ? "disabled" : ""}`}
        type="button"
        name="Previous"
        disabled={actualPage === 1}
        onClick={() => navigate(`${url}/on/${actualPage - 1}`)}
      >
        Anterior
      </button>

      <span id="page-num">{actualPage}</span>

      <button
        className={`button ${noMore ? "disabled" : ""}`}
        type="button"
        name="Next"
        disabled={noMore}
        onClick={() => navigate(`${url}/on/${actualPage + 1}`)}
      >
        Siguiente
      </button>
    </footer>
  );
};
