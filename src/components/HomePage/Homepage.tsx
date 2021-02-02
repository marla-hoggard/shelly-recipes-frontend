import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { getAllRecipes } from '../../api/recipe';
import { Recipe } from '../../types/recipe.types';
import Loading from '../base/Loading';
import Error from '../base/Error';
import RecipeListItem from '../base/RecipeListItem';
import TitleSearch from './TitleSearch';
import classes from '../../global-styles/base.module.scss';

const Homepage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const fetchRecipes = useCallback(async () => {
    const results = await getAllRecipes();
    if ('data' in results) {
      setRecipes(results.data);
      setError(false);
    } else {
      setError(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const PageTitle = useMemo(
    () => <h1 className={classes.pageTitle}>Glasser Family Recipe Collection</h1>,
    [],
  );

  if (loading) {
    return (
      <>
        {PageTitle}
        <Loading />
      </>
    );
  }

  if (error) {
    return (
      <>
        {PageTitle}
        <Error />
      </>
    );
  }

  return (
    <>
      {PageTitle}
      <TitleSearch />
      {recipes.map((recipe) => (
        <RecipeListItem key={recipe.id} recipe={recipe} />
      ))}
    </>
  );
};

export default Homepage;
