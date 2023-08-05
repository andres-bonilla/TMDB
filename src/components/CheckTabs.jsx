import React, { useState } from "react";
import "../styles/checkTabs.css";
import { useDispatch } from "react-redux";
import { setMType } from "../store/mType";

export const CheckTabs = () => {
  const dispatch = useDispatch();

  const [check, setCheck] = useState([false, false, false]);

  const checkHandler = (esFalso, negado) => {
    let checkb = check;
    if (negado === 3) {
      checkb = [false, false, false];
    } else {
      checkb = [
        esFalso[0] && checkb[0],
        esFalso[1] && checkb[1],
        esFalso[2] && checkb[2],
      ];
      checkb[negado] = !checkb[negado];
    }
    dispatch(
      setMType(
        checkb[0] && checkb[1]
          ? "movie_or_tv"
          : checkb[0]
          ? "movie"
          : checkb[1]
          ? "tv"
          : checkb[2]
          ? "person"
          : "any"
      )
    );
    setCheck(checkb);
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
