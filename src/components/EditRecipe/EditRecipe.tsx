import React, { useEffect, useCallback, useState } from "react";

import { getRecipe } from "../../api";
import RecipeForm from "../RecipeForm/RecipeForm";
import classes from "./EditRecipe.module.scss";
import { useParams, useHistory } from "react-router-dom";

const EditRecipe: React.FC = () => {
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [savedValues, setSavedValues] = useState({});

  const fetchRecipe = useCallback(async () => {
    const recipe = await getRecipe(id);
    if ("id" in recipe) {
      setSavedValues({
        ...recipe,
        source: recipe.source || "",
        sourceUrl: recipe.sourceUrl || "",
        servings: recipe.servings || "",
        tags: recipe.tags.join(", "),
        ingredients: recipe.ingredients.join("\n"),
        steps: recipe.steps.join("\n\n"),
      });
      setLoading(false);
    } else {
      history.push("/404");
    }
  }, [history, id]);

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className={classes.pageTitle}>Edit Recipe</h1>
      <RecipeForm savedValues={savedValues} type="edit" id={id} />
    </>
  );
};

export default EditRecipe;
