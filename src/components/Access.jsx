import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

export const Access = () => {
  const navigate = useNavigate();

  let [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [entrar, setEntrar] = useState(false),
    [logOn, setLogOn] = useState(false),
    [cerrar, setCerrar] = useState(false),
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
            setLogOn(true);
            setMensaje("Sesion iniciada con exito");
          }
        });
    }
    setEntrar(false);
  }, [entrar]);

  useEffect(() => {
    if (cerrar) {
      axios
        .get("/api/user/leave")
        .then((res) => res.data)
        .then(({ error, data }) => {
          if (error) {
            setMensaje(data);
          } else {
            setLogOn(false);
            navigate(data);
          }
        });
    }
    setCerrar(false);
  }, [cerrar]);

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

  const logOutHandler = (e) => {
    e.preventDefault();
    setCerrar(true);
  };

  return (
    <div>
      <h2>Iniciar sesion</h2>

      <form onSubmit={submitHandler}>
        <p style={{ color: "red" }}>{mensaje}</p>
        <label>
          E-mail
          <input
            type="email"
            name="email"
            value={email}
            onChange={emailHandler}
          />
        </label>

        <label>
          Password
          <input
            type="text"
            name="password"
            value={password}
            onChange={passwordHandler}
          />
        </label>

        <button
          type="submit"
          name="Iniciar sesion"
          disabled={!email || !password}
        >
          Iniciar sesion
        </button>
        <button
          type="button"
          name="Cerrar sesion"
          disabled={!logOn}
          onClick={logOutHandler}
        >
          Cerrar sesion
        </button>
      </form>

      <Link to="/enroll">Registrarse</Link>
    </div>
  );
};
