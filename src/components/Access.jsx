import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Access = () => {
  let [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [enviar, setEnviar] = useState(false),
    [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (enviar) {
      axios
        .post("/api/user/access", { email: email, password: password })
        .then((res) => res.data)
        .then(({ error, data }) => {
          if (error) {
            setMensaje(data);
          } else {
            setMensaje("Sesion iniciada con exito");
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
    <div>
      <h2>Iniciar sesion</h2>

      <form onSubmit={submitHandler}>
        <p style={{ color: "red" }}>{mensaje}</p>
        <label>
          E-mail
          <input
            onChange={emailHandler}
            value={email}
            type="email"
            name="email"
          />
        </label>

        <label>
          Password
          <input
            onChange={passwordHandler}
            value={password}
            type="text"
            name="password"
          />
        </label>

        <button
          type="submit"
          name="Iniciar sesion"
          disabled={!email || !password}
        >
          Iniciar sesion
        </button>
      </form>

      <Link to="/enroll">Registrarse</Link>
    </div>
  );
};
