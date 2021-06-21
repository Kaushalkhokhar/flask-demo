import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";

const Navbar = () => {
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
            to="/login"
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            className={classes.nav__link}
            activeClassName={classes.active}
            to="/logout"
          >
            Logout
          </NavLink>
        </li>
        <li>
          <NavLink
            className={classes.nav__link}
            activeClassName={classes.active}
            to="/add_user"
          >
            Register
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
