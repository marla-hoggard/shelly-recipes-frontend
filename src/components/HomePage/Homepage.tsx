import React, { useState, useCallback, useEffect } from "react";
import { getAllRecipes } from "../../api";
import { Recipe } from "../../types/api.types";
import Loading from "../base/Loading";
import RecipeListItem from "./RecipeListItem";
import classes from "./Homepage.module.scss";

const Homepage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const fetchRecipes = useCallback(async () => {
    const results = await getAllRecipes();
    if ("data" in results) {
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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Something went wrong. Please refresh to try again.</div>;
  }

  return (
    <>
      <h1 className={classes.pageTitle}>The Glasser Family Recipe Collection</h1>
      {recipes.map((recipe) => (
        <RecipeListItem key={recipe.id} recipe={recipe} />
      ))}
    </>
  );
};

export default Homepage;
