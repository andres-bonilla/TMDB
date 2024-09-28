import React from "react";
import { useSelector } from "react-redux";

import { useQuery } from "../utils/useQuery";

export const PageNav = ({ noMore }) => {
  const page = useSelector((state) => state.search.page);
  const { setQueryPage } = useQuery();

  return (
    <footer id="page-nav">
      <button
        className={`button ${page === 1 ? "disabled" : ""}`}
        type="button"
        name="Previous"
        disabled={page === 1}
        onClick={() => setQueryPage(page - 1)}
      >
        Anterior
      </button>

      <span id="page-num">{page}</span>

      <button
        className={`button ${noMore ? "disabled" : ""}`}
        type="button"
        name="Next"
        disabled={noMore}
        onClick={() => setQueryPage(page + 1)}
      >
        Siguiente
      </button>
    </footer>
  );
};
