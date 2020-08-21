import React from "react";
import { Recipe as RecipeType } from "../../types/api.types";
import { Link } from "react-router-dom";
import Category from "../base/Category";
import Tag from "../base/Tag";
import classes from "./Homepage.module.scss";

type Props = {
  recipe: RecipeType;
};

const RecipeListItem: React.FC<Props> = ({ recipe: { id, category, source, tags, title } }) => {
  return (
    <div className={classes.recipeItemContainer}>
      <div className={classes.row}>
        <div className={classes.titleAndSource}>
          <Link to={`/recipe/${id}`} className={classes.link}>
            {title}
          </Link>
          {source && ` (${source})`}
        </div>
        <Category category={category} />
      </div>
      {/* <div className={classes.tagsContainer}>
        {tags.map((tag) => (
          <Tag key={tag} text={tag} small />
        ))}
      </div> */}
    </div>
  );
};

export default RecipeListItem;
