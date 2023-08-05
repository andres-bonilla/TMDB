import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { Search } from "./Search";

export const Navbar = () => {
  return (
    <div id="navbar">
      <div id="logo">
        <Link to="/">
          <h1>Movie BASE</h1>
        </Link>
      </div>

      <Search />

      <div id="logInOut">
        <Link to="/access">
          <h3>Log In</h3>
        </Link>
      </div>
    </div>
  );
};
