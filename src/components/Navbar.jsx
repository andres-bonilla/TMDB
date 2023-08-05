import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setLog } from "../store/log";
import { Search } from "./Search";
import "../styles/navbar.css";

export const Navbar = () => {
  const navigate = useNavigate(),
    dispatch = useDispatch();

  const isLog = useSelector((state) => state.log);

  const logOut = (e) => {
    e.preventDefault();
    axios
      .get("/api/user/leave")
      .then((res) => res.data)
      .then(({ error, data }) => {
        if (error) {
          console.log(data);
        } else {
          dispatch(setLog(false));
          navigate(data);
        }
      });
  };

  const logIn = (e) => {
    e.preventDefault();
    navigate("/access");
  };

  return (
    <div id="navbar">
      <div id="logo">
        <Link to="/">
          <h1>Movie BASE</h1>
        </Link>
      </div>

      <Search />

      <div id="logButton">
        {isLog ? (
          <button
            className="buttons"
            style={{ backgroundColor: "red" }}
            type="button"
            name="Cerrar sesion"
            onClick={logOut}
          >
            Cerrar sesion
          </button>
        ) : (
          <button
            className="buttons"
            style={{ backgroundColor: "green" }}
            type="button"
            name="Iniciar sesion"
            onClick={logIn}
          >
            Iniciar sesion
          </button>
        )}
      </div>
    </div>
  );
};
