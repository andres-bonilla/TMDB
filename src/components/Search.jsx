import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setResult } from "../store/result";

export const Search = () => {
  let [check, setCheck] = useState([false, false, false]),
    [searchWords, setSearchWords] = useState(""),
    [mediaType, setMediaType] = useState("any"),
    [oldSearch, setOldSearch] = useState(null);

  const navigate = useNavigate(),
    dispatch = useDispatch();

  useEffect(() => {
    if (searchWords && searchWords[searchWords.length - 1] !== " ") {
      const words = searchWords.replace(/ /g, "%20");

      setOldSearch(new AbortController());

      axios
        .get(`/api/search/${mediaType}?by_words=${words}`, {
          signal: oldSearch ? oldSearch.signal : null,
        })
        .then(({ data }) => {
          if (!data.error) dispatch(setResult(data));
          navigate(`/search/${mediaType}?by_words=${words}`);
        })
        .catch((err) => {
          console.log(`Too FAST\n   Search of "${words}" is ${err.message}`);
        });

      return () => {
        if (searchWords.length > 1 && oldSearch) oldSearch.abort();
      };
    }
  }, [searchWords, mediaType]);

  const checkHandler = (esFalso, negado) => {
    check = [
      esFalso[0] && check[0],
      esFalso[1] && check[1],
      esFalso[2] && check[2],
    ];
    check[negado] = !check[negado];

    setMediaType(
      check[0] && check[1]
        ? "movie_or_tv"
        : check[0]
        ? "movie"
        : check[1]
        ? "tv"
        : check[2]
        ? "person"
        : "any"
    );

    setCheck(check);
  };

  const changeHandler = (e) => {
    e.preventDefault();
    setSearchWords(e.target.value);
  };

  return (
    <div id="searchForm">
      <form style={{ margin: "7px 0px" }}>
        <div id="searchBox">
          <input
            onChange={changeHandler}
            value={searchWords}
            type="text"
            name="words"
          />
        </div>

        <div id="checkBox">
          <label>
            <input
              onChange={() => checkHandler([true, true, false], 0)}
              checked={check[0]}
              type="checkbox"
              name="movie"
            />
            Pelicula
          </label>

          <label>
            <input
              onChange={() => checkHandler([true, true, false], 1)}
              checked={check[1]}
              type="checkbox"
              name="tv"
            />
            Tv
          </label>

          <label>
            <input
              onChange={() => checkHandler([false, false, true], 2)}
              checked={check[2]}
              type="checkbox"
              name="person"
            />
            Persona
          </label>
        </div>
      </form>
    </div>
  );
};
