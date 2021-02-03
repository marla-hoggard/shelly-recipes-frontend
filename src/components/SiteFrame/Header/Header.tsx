import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { signout } from '../../../api/users';
import { clearTokenFromStorage } from '../../../api/helpers';
import { selectCurrentUser, resetCurrentUser } from '../../../reducers/currentUser';
import classes from './Header.module.scss';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const currentUser = useSelector(selectCurrentUser);

  const handleSignout = useCallback(async () => {
    if (currentUser) {
      const isSignedOut = await signout(currentUser.token);
      if (isSignedOut) {
        dispatch(resetCurrentUser());
        clearTokenFromStorage();
      }
    }
  }, [currentUser, dispatch]);

  if (currentUser) {
    return (
      <div className={classes.headerContainer}>
        <div className={classes.leftContainer}>
          <div className={classes.linkContainer}>
            <Link className={classes.navLink} to="/">
              Home
            </Link>
          </div>
          <div className={classes.linkContainer}>
            <Link className={classes.navLink} to="/search">
              Search
            </Link>
          </div>
          <div className={classes.linkContainer}>
            <Link className={classes.navLink} to="/new">
              Add a Recipe
            </Link>
          </div>
        </div>
        <div className={classes.centerContainer}></div>
        <div className={classes.rightContainer}>
          <div className={classes.linkContainer}>
            <Link className={classes.navLink} to="/">
              Hi, {currentUser.firstName}
            </Link>
          </div>
          <div className={classes.linkContainer}>
            <div className={classes.navLink} onClick={handleSignout}>
              Log Out
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.headerContainer}>
      <div className={classes.leftContainer}>
        <div className={classes.linkContainer}>
          <Link className={classes.navLink} to="/">
            Home
          </Link>
        </div>
        <div className={classes.linkContainer}>
          <Link className={classes.navLink} to="/search">
            Search
          </Link>
        </div>
      </div>
      <div className={classes.centerContainer}></div>
      <div className={classes.rightContainer}>
        {pathname === '/login' ? (
          <div className={classes.linkContainer}>
            <Link className={classes.navLink} to="/signup">
              Sign Up
            </Link>
          </div>
        ) : (
          <div className={classes.linkContainer}>
            <Link className={classes.navLink} to="/login">
              Log In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
