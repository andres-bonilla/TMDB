import "../styles/results.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextPage, prevPage } from "../store/searchSlice";

export const PageSelector = () => {
  const dispatch = useDispatch();

  const page = useSelector((state) => state.search.page);

  return (
    <div id="pageSelector">
      <button
        className="buttons pageButton"
        type="button"
        name="Next"
        onClick={() => dispatch(prevPage())}
      >
        anterior
      </button>
      <span>{page}</span>
      <button
        className="buttons pageButton"
        type="button"
        name="Next"
        onClick={() => dispatch(nextPage())}
      >
        Siguiente
      </button>
    </div>
  );
};
