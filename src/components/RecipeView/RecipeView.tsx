import React, { useCallback, useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { GetRecipeSuccess } from "../../types/api.types";
import { getRecipe } from "../../api-recipes";
import Loading from "../base/Loading";
import Tag from "../base/Tag";
import Steps from "./Steps";
import classes from "./RecipeView.module.scss";
import Ingredients from "./Ingredients";
import { useSelector } from "react-redux";
import { selectCurrentUserFullName, selectIsAdmin } from "../../reducers/currentUser";

const RecipeView: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState<GetRecipeSuccess>();
  const currentUserFullName = useSelector(selectCurrentUserFullName);
  const isAdmin = useSelector(selectIsAdmin);
  const canEdit = isAdmin || currentUserFullName === recipe?.submitted_by;
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
        <h1 className={classes.pageTitle}>
          {recipe.title}
          {recipe.tags.includes("favorites") && (
            <FontAwesomeIcon className={classes.featuredStar} icon={faStar} />
          )}
        </h1>
        {recipe.source &&
          (recipe.source_url ? (
            <div className={classes.source}>
              <a
                className={classes.link}
                href={recipe.source_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {recipe.source}
              </a>
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
        {(recipe.vegetarian || recipe.tags.length > 0) && (
          <div className={classes.tagsContainer}>
            {recipe.tags.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
            {recipe.vegetarian && <Tag key="vegetarian" text="vegetarian" />}
          </div>
        )}
        {/* TODO: Check if user id match */}
        {canEdit && (
          <div>
            <Link className={classes.link} to={`/recipe/${id}/edit`}>
              Edit Recipe
            </Link>
          </div>
        )}
      </>
    );
  }

  return <div>Something went wrong. Please refresh to try again.</div>;
};

export default RecipeView;
