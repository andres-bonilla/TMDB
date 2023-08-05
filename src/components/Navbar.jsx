import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div>
      <Link to="/">
        <h1>¡Movie BASE!</h1>
      </Link>

      <Link to="/search/any">
        <h2>Buscar</h2>
      </Link>

      <Link to="/access">
        <h3>Access</h3>
      </Link>
    </div>
  );
};
