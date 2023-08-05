import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLog } from "../store/log";
import "../styles/accessEnroll.css";

export const Access = () => {
  let [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [mensaje, setMensaje] = useState("");

  const navigate = useNavigate(),
    dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("/api/user/access", { email: email, password: password })
      .then((res) => res.data)
      .then(({ error, data }) => {
        if (error) {
          setMensaje(data);
        } else {
          dispatch(setLog(true));
          setMensaje("");
          navigate("/");
        }
      });
  };

  const emailHandler = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  return (
    <div className="logSignBox">
      <h2>¡Bienvenido!</h2>

      <form onSubmit={submitHandler}>
        <label for="email">Correo electronico</label>
        <div className="logSignInput">
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={emailHandler}
          />
        </div>

        <label for="password">Contraseña</label>
        <div className="logSignInput">
          <input
            id="password"
            type="text"
            name="password"
            value={password}
            onChange={passwordHandler}
          />
        </div>

        <button
          className="buttons logSignButton"
          type="submit"
          name="Iniciar sesion"
          disabled={!email || !password}
        >
          Iniciar sesión
        </button>
      </form>
      {mensaje ? (
        <p className="logSignText" style={{ color: "red" }}>
          {mensaje}
        </p>
      ) : null}
      <div className="linkBox">
        <p className="logSignText">¿No tienes cuenta?</p>
        <Link to="/enroll" className="logSignText">
          Créala
        </Link>
      </div>
    </div>
  );
};
