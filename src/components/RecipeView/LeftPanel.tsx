import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GetRecipeSuccess } from '../../types/recipe.types';
import { selectCurrentUserFullName, selectIsAdmin } from '../../reducers/currentUser';
import classes from './RecipeView.module.scss';
import Ingredients from './Ingredients';
import Tag from '../base/Tag';

type Props = {
  recipe: GetRecipeSuccess;
  recipeId: number;
};

const LeftPanel: React.FC<Props> = ({ recipe, recipeId }) => {
  const currentUserFullName = useSelector(selectCurrentUserFullName);
  const isAdmin = useSelector(selectIsAdmin);
  const canEdit = isAdmin || currentUserFullName === recipe?.submitted_by;

  return (
    <div className={classes.leftContainer}>
      <div className={classes.recipeMetadata}>
        <div>
          <Link to={`/search?category=${recipe.category}`} className={classes.category}>
            {recipe.category}
          </Link>
        </div>
        {recipe.servings && (
          <div className={classes.servings}>
            {`${/[a-z]/i.test(recipe.servings) ? 'Makes:' : 'Serves:'} `}
            {recipe.servings}
          </div>
        )}
      </div>
      <Ingredients ingredients={recipe.ingredients} />
      {(recipe.vegetarian || recipe.tags.length > 0) && (
        <div className={classes.tagsContainer}>
          {recipe.tags.map((tag) => (
            <Tag key={tag} text={tag} />
          ))}
          {recipe.vegetarian && <Tag key="vegetarian" text="vegetarian" />}
        </div>
      )}
      <div className={classes.submittedBy}>
        Submitted By: {recipe.submitted_by}
        {canEdit && (
          <>
            {' | '}
            <Link className={classes.link} to={`/recipe/${recipeId}/edit`}>
              Edit
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default LeftPanel;
