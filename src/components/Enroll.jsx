import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export const Enroll = () => {
  let [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [enviar, setEnviar] = useState(false),
    [mensaje, setMensaje] = useState("");

  // const navigate = useNavigate()

  useEffect(() => {
    if (enviar) {
      axios
        .post("/api/user/enroll", { email: email, password: password })
        .then((res) => res.data)
        .then(({ error, data }) => {
          if (error) {
            setMensaje(data);
          } else {
            setMensaje("Registrado con exito");
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
      <h2>Registro</h2>

      <p>Llene el siguente formulario para registrarse</p>

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

        <button type="submit" name="Registrarse">
          Registrarse
        </button>
      </form>

      <Link to="/access">Iniciar sesion</Link>
    </div>
  );
};
