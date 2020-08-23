import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";
import SearchForm, { SearchValues, defaultValues } from "./SearchForm";
import { Category, Recipe } from "../../types/api.types";
import RecipeListItem from "../base/RecipeListItem";

type SearchKeys = keyof SearchValues;

const isSearchKey = (key: string): key is SearchKeys => key in defaultValues;

const SearchPage: React.FC = () => {
  const { search } = useLocation();
  const history = useHistory();
  const [searchParams, setSearchParams] = useState<Partial<SearchValues>>({});
  const [noneFound, setNoneFound] = useState(false);
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);

  const updateResults = useCallback((results: Recipe[]) => {
    setSearchResults(results);
    setNoneFound(results.length === 0);
  }, []);

  useEffect(() => {
    console.log(search);
    if (search) {
      const urlParams = new URLSearchParams(search);
      const params: Partial<SearchValues> = {};
      // @ts-ignore
      for (const [key, value] of urlParams) {
        if (isSearchKey(key)) {
          switch (key) {
            case "vegetarian":
              params[key] =
                value === "true" ? "vegetarian" : value === "false" ? "non-vegetarian" : "";
              break;
            case "category":
              params[key] = value as Category;
              break;
            case "matchType": {
              if (value === "any" || value === "all") {
                params[key] = value;
              }
              break;
            }
            default:
              params[key] = value;
          }
        }
      }
      setSearchParams(params);
      history.push("/search");
    }
  }, [search, history]);

  return (
    <>
      <SearchForm paramValues={searchParams} setSearchResults={updateResults} />
      {noneFound ? (
        <div>No recipes found.</div>
      ) : (
        searchResults.map((recipe) => <RecipeListItem key={recipe.id} recipe={recipe} />)
      )}
    </>
  );
};

export default SearchPage;
