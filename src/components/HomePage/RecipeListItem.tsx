import React from "react";
import { Recipe as RecipeType } from "../../types/api.types";
import { Link } from "react-router-dom";
import classes from "./Homepage.module.scss";

type Props = {
  recipe: RecipeType;
};

const RecipeListItem: React.FC<Props> = ({ recipe: { id, category, source, tags, title } }) => {
  return (
    <div className={classes.recipeItemContainer}>
      <div>
        <Link to={`/recipe/${id}`}>{title}</Link>
        {source && ` (${source})`}
      </div>
      <div>{category.toUpperCase()}</div>
      <div>{tags.join(", ")}</div>
    </div>
  );
};

export default RecipeListItem;
