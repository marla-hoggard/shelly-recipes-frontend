import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import SearchForm, { SearchValues } from './SearchForm';
import { Category, Recipe } from '../../types/recipe.types';
import RecipeListItem from '../base/RecipeListItem';
import { searchRecipes } from '../../api/recipe';

type UrlParams = {
  tags?: string;
  vegetarian?: boolean;
  category?: Category;
  title?: string;
};

const SearchPage: React.FC = () => {
  const { search } = useLocation();
  const history = useHistory();
  const [searchInitialValues, setSearchInitialValues] = useState<Partial<SearchValues>>({});
  const [noneFound, setNoneFound] = useState(false);
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [displaySearchForm, setDisplaySearchForm] = useState(false);

  const updateResults = useCallback((results: Recipe[]) => {
    setSearchResults(results);
    setNoneFound(results.length === 0);
  }, []);

  const fetchSearchResults = useCallback(async (params: UrlParams) => {
    const results = await searchRecipes(params);
    setSearchResults(results);
    setDisplaySearchForm(true);
  }, []);

  useEffect(() => {
    if (search) {
      setDisplaySearchForm(false);
      const urlParams = new URLSearchParams(search);
      const params: UrlParams = {};
      const tags = urlParams.get('tags') ?? '';
      const vegetarian = urlParams.get('vegetarian') ?? '';
      const category = (urlParams.get('category') as Category) ?? '';
      const title = urlParams.get('title') ?? '';

      if (tags) {
        params.tags = tags;
      }

      if (category) {
        params.category = category;
      }

      if (title) {
        params.title = title;
      }

      if (vegetarian) {
        params.vegetarian = Boolean(vegetarian);
        setSearchInitialValues({
          ...params,
          vegetarian: params.vegetarian ? 'vegetarian' : 'non-vegetarian',
        });
      } else {
        setSearchInitialValues({ ...params, vegetarian: undefined });
      }

      history.push('/search');
      fetchSearchResults(params);
    } else {
      setDisplaySearchForm(true);
    }
  }, [search, history, fetchSearchResults]);

  return (
    <>
      {displaySearchForm && (
        <SearchForm paramValues={searchInitialValues} setSearchResults={updateResults} />
      )}
      {noneFound ? (
        <div>No recipes found.</div>
      ) : (
        searchResults.map((recipe) => <RecipeListItem key={recipe.id} recipe={recipe} />)
      )}
    </>
  );
};

export default SearchPage;
