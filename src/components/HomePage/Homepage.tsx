import React, { useEffect } from 'react';
import { BACKEND_BASE_URL } from '../../constants';
import TitleSearch from './TitleSearch';
import CategoryList from './CategoryList';
import classes from '../../global-styles/base.module.scss';

const Homepage: React.FC = () => {
  useEffect(() => {
    // hit the backend on load to wake up dynos
    fetch(`${BACKEND_BASE_URL}`);
  }, []);

  return (
    <>
      <h1 className={classes.pageTitle}>Glasser Family Recipe Collection</h1>
      <TitleSearch />
      <CategoryList />
    </>
  );
};

export default Homepage;
