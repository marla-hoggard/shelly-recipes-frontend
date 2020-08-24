import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";
import SearchForm, { SearchValues } from "./SearchForm";
import { Category, Recipe } from "../../types/api.types";
import RecipeListItem from "../base/RecipeListItem";
import { searchRecipes } from "../../api";

type UrlParams = {
  tags?: string;
  category?: Category;
  title?: string;
};

const SearchPage: React.FC = () => {
  const { search } = useLocation();
  const history = useHistory();
  const [searchParams, setSearchParams] = useState<Partial<SearchValues>>({});
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
      const tags = urlParams.get("tags") ?? "";
      const category = (urlParams.get("category") as Category) ?? "";
      const title = urlParams.get("title") ?? "";

      if (tags) {
        params.tags = tags;
      }

      if (category) {
        params.category = category;
      }

      if (title) {
        params.title = title;
      }

      setSearchParams(params);
      history.push("/search");
      fetchSearchResults(params);
    } else {
      setDisplaySearchForm(true);
    }
  }, [search, history, fetchSearchResults]);

  return (
    <>
      {displaySearchForm && (
        <SearchForm paramValues={searchParams} setSearchResults={updateResults} />
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
