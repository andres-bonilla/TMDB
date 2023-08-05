import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setLog } from "../store/log";

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
      </form>

      <Link to="/enroll">Registrarse</Link>
    </div>
  );
};
