import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { searchRecipes } from '../../api/recipe';
import { Recipe, SearchParams } from '../../types/recipe.types';
import Loading from '../base/Loading';
import RecipeListItem from '../base/RecipeListItem';
import { CATEGORY_DATA } from '../HomePage/CategoryList';
import classes from './Browse.module.scss';

const Browse: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const history = useHistory();
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);

  const fetchSearchResults = useCallback(async (params: SearchParams) => {
    const results = await searchRecipes(params);
    setSearchResults(results);
    setLoading(false);
  }, []);

  useEffect(() => {
    const categoryData = CATEGORY_DATA.find((el) => el.name === name);
    if (!categoryData) {
      history.push('/404');
      return;
    }

    setDisplayName(categoryData.displayName);
    fetchSearchResults(categoryData.searchParams);
  }, [name, history, fetchSearchResults]);

  const PageTitle = useMemo(() => <h1 className={classes.pageTitle}>{displayName}</h1>, [
    displayName,
  ]);

  if (loading) {
    return (
      <>
        {PageTitle}
        <Loading text="Searching..." />
      </>
    );
  }

  if (!searchResults) {
    return (
      <>
        {PageTitle}
        <div>No recipes found</div>
      </>
    );
  }

  return (
    <>
      {PageTitle}
      {searchResults.map((recipe) => (
        <RecipeListItem key={recipe.id} recipe={recipe} />
      ))}
    </>
  );
};

export default Browse;
