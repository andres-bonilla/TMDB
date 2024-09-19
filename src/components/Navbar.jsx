import "../styles/navbar.css";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isLoged } from "../store/userSlice";
import { Search } from "./Search";
import { ReactComponent as MBLogo } from "../assets/mb.svg";
import { ReactComponent as LogInLogo } from "../assets/log.svg";

export const Navbar = () => {
  const navigate = useNavigate(),
    dispatch = useDispatch();

  const loged = useSelector((state) => state.user);

  const logOut = (e) => {
    e.preventDefault();
    axios
      .get("/api/user/leave")
      .then((res) => res.data)
      .then(({ error, data }) => {
        if (error) {
          console.log(data);
        } else {
          dispatch(isLoged(false));
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
      <Link to="/">
        <MBLogo id="logo" />
      </Link>

      <Search />
      {/*loged ? (
        <button
          className="logButton buttons"
          type="button"
          name="Cerrar sesion"
          onClick={logOut}
        >
          <LogInLogo style={{ fill: "red" }} />
        </button>
      ) : (
        <button
          className="logButton buttons"
          type="button"
          name="Iniciar sesion"
          onClick={logIn}
        >
          <LogInLogo style={{ fill: "green" }} />
        </button>
      )*/}
    </div>
  );
};
