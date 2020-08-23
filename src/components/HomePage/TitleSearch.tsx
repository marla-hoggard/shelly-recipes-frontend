import React, { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import debounce from "debounce-promise";
import { Recipe } from "../../types/api.types";
import { searchRecipes } from "../../api";
import SearchResults from "./SearchResults";
import classes from "./TitleSearch.module.scss";

const DEBOUNCE_INTERVAL = 300;

type AsyncSearchFunction = (query: string) => Promise<void>;

const debouncedSearch = debounce(
  (searchFn: AsyncSearchFunction, query: string) => searchFn(query),
  DEBOUNCE_INTERVAL,
);

const UserSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [hasExactMatch, setHasExactMatch] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [results, setResults] = useState<Recipe[]>([]);
  const [cursor, setCursor] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const noneFound = useMemo(
    () => query.length > 0 && !isFetching && !results.length && showResults,
    [query, isFetching, results, showResults],
  );
  const disabled = useMemo(
    () => !query.length || !results.length || (!hasExactMatch && !showResults),
    [query, results, showResults, hasExactMatch],
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const history = useHistory();

  const fetchSearchResults: AsyncSearchFunction = useCallback(async (queryString: string) => {
    if (queryString.length) {
      const searchResults = await searchRecipes({ title: queryString, limit: 10 });
      setResults(searchResults);

      // If the results contains an exact match, set the cursor to that recipe
      const queryIndex = searchResults.findIndex(
        (el) => el.title.toLowerCase() === queryString.toLowerCase(),
      );
      setCursor(queryIndex !== -1 ? queryIndex : 0);
      setHasExactMatch(queryIndex !== -1);
    } else {
      setResults([]);
    }
    setIsFetching(false);
    setShowResults(true);
  }, []);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
      setIsFetching(true);
      setCursor(-1);
      debouncedSearch(fetchSearchResults, event.target.value);
    },
    [fetchSearchResults],
  );

  // Allow for arrow navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp": {
          if (!event.shiftKey && cursor > 0) {
            event.preventDefault();
            setCursor(cursor - 1);
          }
          break;
        }
        case "ArrowDown": {
          if (!event.shiftKey && cursor < results.length - 1) {
            event.preventDefault();
            setCursor(cursor + 1);
          }
          break;
        }
        case "Tab": {
          setShowResults(false);
          break;
        }
      }
    },
    [cursor, results],
  );

  const handleResultClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      const recipeClicked = event.currentTarget.dataset.id;
      if (recipeClicked) {
        history.push(`/recipe/${recipeClicked}`);
      }
    },
    [history],
  );

  const handleResultsBlur = useCallback(
    (event: Event) => {
      const resultsContainsEvent = resultsRef.current?.contains(event.target as Node);
      const inputContainsEvent = inputRef.current?.contains(event.target as Node);
      const buttonContainsEvent = buttonRef.current?.contains(event.target as Node);
      if (!resultsContainsEvent && !inputContainsEvent && !buttonContainsEvent) {
        setShowResults(false);
      }
    },
    [resultsRef, inputRef, buttonRef],
  );

  const handleInputFocus = useCallback(() => {
    if (results.length) {
      setShowResults(true);
    }
  }, [results]);

  const handleSubmit = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      if (results.length) {
        const selected = showResults || hasExactMatch ? results[cursor] : null;
        if (selected) {
          history.push(`/recipe/${selected.id}`);
        }
      }
    },
    [results, showResults, hasExactMatch, cursor, history],
  );

  useEffect(() => {
    document.addEventListener("click", handleResultsBlur, false);
    return (): void => {
      document.removeEventListener("click", handleResultsBlur, false);
    };
  }, [handleResultsBlur]);

  return (
    <div
      className={classNames({ [classes.formContainer]: true, [classes.marginBottom]: !noneFound })}
    >
      <div>
        <form className={classes.form}>
          <div>
            <input
              className={classes.searchInput}
              ref={inputRef}
              autoFocus
              type="search"
              placeholder="Search by title"
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={handleInputFocus}
              value={query}
            />
            {showResults && results.length > 0 && (
              <SearchResults
                innerRef={resultsRef}
                cursor={cursor}
                setCursor={setCursor}
                handleClick={handleResultClick}
                recipes={results}
              />
            )}
          </div>
          <div>
            <button
              className={classes.submitButton}
              ref={buttonRef}
              disabled={disabled}
              onClick={handleSubmit}
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {noneFound && <div className={classes.noneFound}>No recipes found</div>}
    </div>
  );
};

export default UserSearch;
