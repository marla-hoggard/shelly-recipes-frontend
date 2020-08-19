import React, { useCallback, useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { GetRecipeSuccess } from "../../types/api.types";
import { getRecipe } from "../../api";
import Loading from "../base/Loading";
import Steps from "./Steps";
import classes from "./RecipeView.module.scss";

const RecipeView: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState<GetRecipeSuccess>();
  const { id } = useParams();
  const history = useHistory();

  const fetchRecipe = useCallback(async () => {
    const results = await getRecipe(id);
    if ("error" in results) {
      if (results.error.message === "Recipe not found.") {
        history.push("/404");
        return;
      }
    } else {
      setRecipe(results);
      setLoading(false);
    }
  }, [history, id]);

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  if (loading) {
    return <Loading />;
  }

  if (recipe) {
    return (
      <>
        <h1 className={classes.pageTitle}>{recipe.title}</h1>
        {recipe.source &&
          (recipe.sourceUrl ? (
            <div>
              <Link className={classes.sourceLink} to={recipe.sourceUrl}>
                {recipe.source}
              </Link>
            </div>
          ) : (
            <div className={classes.source}>{recipe.source}</div>
          ))}
        <div className={classes.submittedBy}>Submitted By: {recipe.submittedBy}</div>
        <div className={classes.category}>{recipe.category}</div>
        {recipe.servings && <div className={classes.servings}>Serves: {recipe.servings}</div>}
        <div className={classes.ingredientsContainer}>
          <div className={classes.sectionTitle}>Ingredients:</div>
          {recipe.ingredients.map((ing, i) => (
            <div className={classes.ingredient} key={i}>
              {ing}
            </div>
          ))}
        </div>
        <Steps steps={recipe.steps} />
        {recipe.notes.length > 0 && (
          <>
            <div className={classes.sectionTitle}>Notes:</div>
            <ol className={classes.notesList}>
              {recipe.notes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ol>
          </>
        )}
        <div className={classes.tags}>{recipe.tags.join(", ")}</div>
        <div>
          <Link to={`/recipe/${id}/edit`}>Edit Recipe</Link>
        </div>
      </>
    );
  }

  return <div>Something went wrong. Please refresh to try again.</div>;
};

export default RecipeView;
