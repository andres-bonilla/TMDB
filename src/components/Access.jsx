import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setLog } from "../store/log";
import "../styles/access.css";

export const Access = () => {
  const navigate = useNavigate(),
    dispatch = useDispatch();

  let [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [entrar, setEntrar] = useState(false),
    [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (entrar) {
      axios
        .post("/api/user/access", { email: email, password: password })
        .then((res) => res.data)
        .then(({ error, data }) => {
          if (error) {
            setMensaje(data);
          } else {
            dispatch(setLog(true));
            setMensaje("Sesion iniciada con exito");
            navigate("/");
          }
        });
    }
    setEntrar(false);
  }, [entrar]);

  const submitHandler = (e) => {
    e.preventDefault();
    setEntrar(true);
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
    <div id="logBox">
      <h2>Iniciar sesión</h2>

      <p id="enrollText">¿No tienes cuenta?</p>
      <Link to="/enroll">Créala</Link>

      <form onSubmit={submitHandler}>
        <p style={{ color: "red" }}>{mensaje}</p>
        <label for="email">Correo electronico</label>
        <div className="logInBox">
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={emailHandler}
          />
        </div>

        <label for="password">Contraseña</label>
        <div className="logInBox">
          <input
            id="password"
            type="text"
            name="password"
            value={password}
            onChange={passwordHandler}
          />
        </div>

        <button
          id="logInButton"
          className="button"
          type="submit"
          name="Iniciar sesion"
          disabled={!email || !password}
        >
          Iniciar sesion
        </button>
      </form>
    </div>
  );
};
