import "../styles/accessEnroll.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export const Enroll = () => {
  let [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [mensaje, setMensaje] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("/api/user/enroll", { email: email, password: password })
      .then((res) => res.data)
      .then(({ error, data }) => {
        if (error) {
          setMensaje(data);
        } else {
          setMensaje("");
          navigate("/access");
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
      <h2>Registro</h2>

      <form onSubmit={submitHandler}>
        <label htmlFor="email">Correo electronico</label>
        <div className="logSignInput">
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={emailHandler}
          />
        </div>

        <label htmlFor="password">Contraseña</label>
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
          Registrarse
        </button>
      </form>
      {mensaje ? (
        <p className="logSignText" style={{ color: "red" }}>
          {mensaje}
        </p>
      ) : null}
      <div className="linkBox">
        <p className="logSignText">¿Ya tienes cuenta?</p>
        <Link to="/access" className="logSignText">
          Iniciar Sesión
        </Link>
      </div>
    </div>
  );
};
