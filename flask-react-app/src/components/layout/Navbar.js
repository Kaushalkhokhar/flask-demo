import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./Navbar.module.css";

const Navbar = () => {
  const ctxAuth = useContext(AuthContext);

  const { token } = ctxAuth;

  return (
    <nav className={classes.nav}>
      <ul className={classes.nav__links}>
        <li className={classes.nav__item}>
          <NavLink
            className={classes.nav__link}
            activeClassName={classes.active}
            to="/home"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={classes.nav__link}
            activeClassName={classes.active}
            to="/about"
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            className={classes.nav__link}
            activeClassName={classes.active}
            to="/users"
          >
            Users
          </NavLink>
        </li>
        <li>
          <NavLink
            className={classes.nav__link}
            activeClassName={classes.active}
            to="/register"
          >
            Register
          </NavLink>
        </li>
        {!token && (
          <li>
            <NavLink
              className={classes.nav__link}
              activeClassName={classes.active}
              to="/login"
            >
              Login
            </NavLink>
          </li>
        )}
        {token && <NavLink
          className={classes.nav__link}
          activeClassName={classes.active}
          to="/logout"
        >
          Logout
        </NavLink>}
      </ul>
    </nav>
  );
};

export default Navbar;
