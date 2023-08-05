import "../styles/checkTabs.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export const CheckTabs = () => {
  const navigate = useNavigate();

  const { mediaType, words, page } = useSelector((state) => state.search);

  const [check, setCheck] = useState([false, false, false]);

  useEffect(() => {
    if (mediaType === "movie") {
      setCheck([true, false, false]);
    } else if (mediaType === "tv") {
      setCheck([false, true, false]);
    } else if (mediaType === "movie_or_tv") {
      setCheck([true, true, false]);
    } else if (mediaType === "person") {
      setCheck([false, false, true]);
    } else {
      setCheck([false, false, false]);
    }
  }, [mediaType]);

  const checkHandler = (esFalso, negado) => {
    let auxCheck = check;
    if (negado === 3) {
      auxCheck = [false, false, false];
    } else {
      auxCheck = [
        esFalso[0] && auxCheck[0],
        esFalso[1] && auxCheck[1],
        esFalso[2] && auxCheck[2],
      ];
      auxCheck[negado] = !auxCheck[negado];
    }
    setCheck(auxCheck);
    const media =
      auxCheck[0] && auxCheck[1]
        ? "movie_or_tv"
        : auxCheck[0]
        ? "movie"
        : auxCheck[1]
        ? "tv"
        : auxCheck[2]
        ? "person"
        : "any";
    navigate(`/search/${media}/${words}/on/${page}`);
  };
  return (
    <div id="resultsTabs">
      <div className="tab" id="tab0">
        <label>
          <input
            onChange={() => checkHandler([], 3)}
            checked={!(check[0] || check[1] || check[2])}
            type="checkbox"
            name="movie"
          />
          <span>Todos</span>
        </label>
      </div>

      <div className="tab" id="tab1">
        <label>
          <input
            onChange={() => checkHandler([true, true, false], 0)}
            checked={check[0]}
            type="checkbox"
            name="movie"
          />
          <span>Pelicula</span>
        </label>
      </div>

      <div className="tab" id="tab2">
        <label>
          <input
            onChange={() => checkHandler([true, true, false], 1)}
            checked={check[1]}
            type="checkbox"
            name="tv"
          />
          <span>Televisión</span>
        </label>
      </div>

      <div className="tab" id="tab3">
        <label>
          <input
            onChange={() => checkHandler([false, false, true], 2)}
            checked={check[2]}
            type="checkbox"
            name="person"
          />
          <span>Personas</span>
        </label>
      </div>
    </div>
  );
};
