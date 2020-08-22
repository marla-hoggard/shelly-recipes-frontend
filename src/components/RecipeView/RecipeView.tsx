import React, { useCallback, useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { GetRecipeSuccess } from "../../types/api.types";
import { getRecipe } from "../../api";
import Loading from "../base/Loading";
import Tag from "../base/Tag";
import Steps from "./Steps";
import classes from "./RecipeView.module.scss";
import Ingredients from "./Ingredients";

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
          (recipe.source_url ? (
            <div>
              <Link className={classes.sourceLink} to={recipe.source_url}>
                {recipe.source}
              </Link>
            </div>
          ) : (
            <div className={classes.source}>{recipe.source}</div>
          ))}
        <div className={classes.submittedBy}>Submitted By: {recipe.submitted_by}</div>
        {recipe.servings && <div className={classes.servings}>Serves: {recipe.servings}</div>}
        <Ingredients ingredients={recipe.ingredients} />
        <Steps steps={recipe.steps} />
        {recipe.footnotes.length > 0 && (
          <>
            <div className={classes.sectionTitle}>Notes:</div>
            <ol className={classes.notesList}>
              {recipe.footnotes.map((footnote, index) => (
                <li key={index} data-icon={`[${index + 1}]`}>
                  {footnote}
                </li>
              ))}
            </ol>
          </>
        )}
        {recipe.tags.length > 0 && (
          <div className={classes.tagsContainer}>
            {recipe.tags.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>
        )}
        <div>
          <Link className={classes.link} to={`/recipe/${id}/edit`}>
            Edit Recipe
          </Link>
        </div>
      </>
    );
  }

  return <div>Something went wrong. Please refresh to try again.</div>;
};

export default RecipeView;
