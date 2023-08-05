import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "../styles/accessEnroll.css";

export const Enroll = () => {
  let [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [enviar, setEnviar] = useState(false),
    [mensaje, setMensaje] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (enviar) {
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
    }
    setEnviar(false);
  }, [enviar]);

  const submitHandler = (e) => {
    e.preventDefault();
    setEnviar(true);
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
