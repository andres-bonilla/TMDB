import "../styles/results.css";
import React from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export const PageSelector = () => {
  const navigate = useNavigate();

  const { page, maxElementsGrid, pageData, mediaType, words } = useSelector(
    (state) => state.search
  );

  return (
    <div id="pageSelector">
      <button
        className="buttons pageButton"
        type="button"
        name="Prev"
        disabled={page === 1}
        onClick={() => navigate(`/search/${mediaType}/${words}/on/${page - 1}`)}
      >
        Anterior
      </button>
      <span
        className="buttons pageButton"
        style={{ width: "30px", textAlign: "center" }}
      >
        {page}
      </span>
      <button
        className="buttons pageButton"
        type="button"
        name="Next"
        disabled={pageData.length < maxElementsGrid}
        onClick={() => navigate(`/search/${mediaType}/${words}/on/${page + 1}`)}
      >
        Siguiente
      </button>
    </div>
  );
};
