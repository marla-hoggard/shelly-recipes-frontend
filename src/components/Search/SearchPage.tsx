import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import SearchForm, { SearchValues, defaultValues } from "./SearchForm";
import { Category } from "../../types/api.types";

type SearchKeys = keyof SearchValues;

const isSearchKey = (key: string): key is SearchKeys => key in defaultValues;

const SearchPage: React.FC = () => {
  const { search } = useLocation();
  const history = useHistory();
  const [searchParams, setSearchParams] = useState<Partial<SearchValues>>({});

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
              params[key] = Boolean(value);
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

  return <SearchForm paramValues={searchParams} />;
};

export default SearchPage;
