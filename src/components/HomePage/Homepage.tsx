import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BACKEND_BASE_URL } from '../../constants';
import logo from '../../images/logo.png';
import TitleSearch from './TitleSearch';
import classes from './Homepage.module.scss';

const Homepage: React.FC = () => {
  useEffect(() => {
    // hit the backend on load to wake up dynos
    fetch(`${BACKEND_BASE_URL}`);
  }, []);

  return (
    <div className={classes.heroImageContainer}>
      <div className={classes.contentContainer}>
        <div className={classes.logoContainer}>
          <img className={classes.logo} src={logo} alt="Glasser Recipes" />
        </div>
        <TitleSearch />
        <div className={classes.buttonContainer}>
          <Link className={classes.transparentButton} to="/browse">
            Browse Recipes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
