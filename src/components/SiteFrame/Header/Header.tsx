import React from "react";
import { Link } from "react-router-dom";
import classes from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <div className={classes.headerContainer}>
      <div className={classes.homeLink}>
        <Link className={classes.link} to="/">
          Home
        </Link>
      </div>
      <div className={classes.addLink}>
        <Link className={classes.link} to="/new">
          Add a Recipe
        </Link>
      </div>
      <div className={classes.signinLink}>
        <Link className={classes.link} to="/">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Header;
