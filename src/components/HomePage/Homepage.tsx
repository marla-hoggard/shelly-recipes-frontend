import React from 'react';
import TitleSearch from './TitleSearch';
import CategoryList from './CategoryList';
import classes from '../../global-styles/base.module.scss';

const Homepage: React.FC = () => {
  return (
    <>
      <h1 className={classes.pageTitle}>Glasser Family Recipe Collection</h1>
      <TitleSearch />
      <CategoryList />
    </>
  );
};

export default Homepage;
