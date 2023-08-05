import "../styles/results.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextPage, prevPage } from "../store/searchSlice";

export const PageSelector = () => {
  const dispatch = useDispatch();

  const { page, maxElementsGrid, pageData } = useSelector(
    (state) => state.search
  );

  return (
    <div id="pageSelector">
      <button
        className="buttons pageButton"
        type="button"
        name="Prev"
        disabled={page === 1}
        onClick={() => dispatch(prevPage())}
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
        onClick={() => dispatch(nextPage())}
      >
        Siguiente
      </button>
    </div>
  );
};
