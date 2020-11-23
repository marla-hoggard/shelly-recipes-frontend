import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Recipe as RecipeType } from "../../types/api.types";
import { Link } from "react-router-dom";
import Category from "./Category";
import classes from "./RecipeList.module.scss";

type Props = {
  recipe: RecipeType;
};

const RecipeListItem: React.FC<Props> = ({ recipe: { id, category, source, title, tags } }) => {
  return (
    <div className={classes.recipeItemContainer}>
      <div className={classes.row}>
        <div className={classes.titleAndSource}>
          <Link to={`/recipe/${id}`} className={classes.link}>
            {title}
            {tags && tags.includes("favorites") && (
              <FontAwesomeIcon className={classes.featuredStar} icon={faStar} />
            )}
          </Link>
          {source && ` (${source})`}
        </div>
        <Category category={category} />
      </div>
    </div>
  );
};

export default RecipeListItem;
