import React, { useEffect, useCallback, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import { getRecipe } from "../../api";
import RecipeForm, { FormValues } from "../RecipeForm/RecipeForm";

const EditRecipe: React.FC = () => {
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [savedValues, setSavedValues] = useState<Partial<FormValues>>({});

  const fetchRecipe = useCallback(async () => {
    const recipe = await getRecipe(id);
    if ("id" in recipe) {
      setSavedValues({
        ...recipe,
        source: recipe.source || "",
        sourceUrl: recipe.sourceUrl || "",
        servings: recipe.servings || "",
        tags: recipe.tags.join(", "),
        ingredientsTextarea: recipe.ingredients.map((i) => i.ingredient).join("\n"),
        ingredientsWithNotes: recipe.ingredients.map(({ ingredient, footnote }) => ({
          ingredient,
          footnote: footnote || "",
        })),
        steps: recipe.steps.join("\n\n"),
        notes: recipe.notes,
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

  return <RecipeForm savedValues={savedValues} type="edit" id={id} />;
};

export default EditRecipe;
