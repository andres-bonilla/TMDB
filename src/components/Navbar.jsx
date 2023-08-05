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

  const [cerrar, setCerrar] = useState(false),
    [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (cerrar) {
      axios
        .get("/api/user/leave")
        .then((res) => res.data)
        .then(({ error, data }) => {
          if (error) {
            setMensaje(data);
          } else {
            dispatch(setLog(false));
            navigate(data);
          }
        });
    }
    setCerrar(false);
  }, [cerrar]);

  const logOut = (e) => {
    e.preventDefault();
    setCerrar(true);
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

      <div id="logInOut">
        {isLog ? (
          <button
            class="button"
            style={{ backgroundColor: "red" }}
            type="button"
            name="Cerrar sesion"
            onClick={logOut}
          >
            Cerrar sesion
          </button>
        ) : (
          <button
            class="button"
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
