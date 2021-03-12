import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { Recipe as RecipeType } from '../../../types/recipe.types';
import classes from './RecipeList.module.scss';

type Props = {
  recipe: RecipeType;
};

const RecipeListItem: React.FC<Props> = ({ recipe: { id, title, submitted_by, created_at } }) => {
  const history = useHistory();

  const goToRecipe = useCallback(() => {
    history.push(`/recipe/${id}`);
  }, [history, id]);

  const date = useMemo(() => {
    const d = new Date(created_at);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  }, [created_at]);

  return (
    <div className={classes.recipeItemContainer} onClick={goToRecipe}>
      <div className={classNames(classes.recipeDetails)}>
        <div className={classes.title}>{title}</div>
        <div className={classes.source}>
          {submitted_by} | {date}
        </div>
      </div>
    </div>
  );
};

export default RecipeListItem;
