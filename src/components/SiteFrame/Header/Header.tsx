import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../../../api-users";
import { selectCurrentUser, resetCurrentUser } from "../../../reducers/currentUser";
import classes from "./Header.module.scss";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const handleSignout = useCallback(async () => {
    if (currentUser) {
      const isSignedOut = await signout(currentUser.token);
      if (isSignedOut) {
        dispatch(resetCurrentUser());
      }
    }
  }, [currentUser, dispatch]);

  if (currentUser) {
    return (
      <div className={classes.headerContainer}>
        <div className={classes.homeLink}>
          <Link className={classes.link} to="/">
            Home
          </Link>
        </div>
        <div className={classes.searchLink}>
          <Link className={classes.link} to="/search">
            Search
          </Link>
        </div>
        <div className={classes.addLink}>
          <Link className={classes.link} to="/new">
            Add a Recipe
          </Link>
        </div>
        <div className={classes.userProfileLink}>
          <Link className={classes.link} to="/">
            Hi, {currentUser.firstName}
          </Link>
        </div>
        <div className={classes.logoutLink} onClick={handleSignout}>
          Log Out
        </div>
      </div>
    );
  }
  return (
    <div className={classes.headerContainer}>
      <div className={classes.homeLink}>
        <Link className={classes.link} to="/">
          Home
        </Link>
      </div>
      <div className={classes.searchLink}>
        <Link className={classes.link} to="/search">
          Search
        </Link>
      </div>
      <div className={classes.addLink}>
        <Link className={classes.link} to="/new">
          Add a Recipe
        </Link>
      </div>
      <div className={classes.loginLink}>
        <Link className={classes.link} to="/login">
          Log In
        </Link>
      </div>
    </div>
  );
};

export default Header;
