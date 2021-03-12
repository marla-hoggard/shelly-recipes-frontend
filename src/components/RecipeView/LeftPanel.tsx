import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { GetRecipeSuccess } from '../../types/recipe.types';
import Ingredients from './Ingredients';
import RightPanel from './RightPanel';
import classes from './RecipeView.module.scss';

type Props = {
  isMobileView?: boolean;
  recipe: GetRecipeSuccess;
  recipeId: number;
};

const LeftPanel: React.FC<Props> = ({ isMobileView = false, recipe, recipeId }) => {
  const [instructionsTabIsActive, setInststructionsTabToActive] = useState(false);

  const showInstructionsTab = isMobileView && instructionsTabIsActive;

  const handleShowIngredients = useCallback(() => setInststructionsTabToActive(false), []);
  const handleShowInstructions = useCallback(() => setInststructionsTabToActive(true), []);

  return (
    <>
      <div className={classes.recipeMetadata}>
        {recipe.servings && (
          <div className={classes.servings}>
            {`${/[a-z]/i.test(recipe.servings) ? 'Makes:' : 'Serves:'} `}
            {recipe.servings}
          </div>
        )}
      </div>
      {isMobileView && (
        <div className={classes.tabs}>
          <div
            className={instructionsTabIsActive ? classes.tab : classes.activeTab}
            onClick={handleShowIngredients}
          >
            Ingredients
          </div>
          <div
            className={instructionsTabIsActive ? classes.activeTab : classes.tab}
            onClick={handleShowInstructions}
          >
            Steps
          </div>
        </div>
      )}
      {showInstructionsTab ? (
        <RightPanel recipe={recipe} isMobileView />
      ) : (
        <>
          {!isMobileView && <div className={classes.sectionTitle}>Ingredients</div>}
          <Ingredients ingredients={recipe.ingredients} />
        </>
      )}
      <div className={classes.spacer} />
      <div className={isMobileView ? classes.centered : classes.topMargin}>
        From: {recipe.submitted_by}
        <span className={classes.screenOnly}>
          {' | '}
          <Link className={classes.link} to={`/recipe/${recipeId}/edit`}>
            Edit
          </Link>
        </span>
      </div>
    </>
  );
};

export default LeftPanel;
