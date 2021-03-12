import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { GetRecipeSuccess } from '../../types/recipe.types';
import { confirmRecipe, getRecipe } from '../../api/recipe';
import useMediaQuery from '../../hooks/useMediaQuery';
import ButtonPanel from './ButtonPanel';
import Confirmation from './Confirmation';
import Error from '../base/Error';
import Loading from '../base/Loading';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import classes from './RecipeView.module.scss';

const printRecipe = () => {
  window.print();
};

const RecipeView: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState<GetRecipeSuccess>();
  const params = useParams<{ id: string }>();
  const recipeId = parseInt(params.id);
  const [isPreview, setIsPreview] = useState(false);
  const [isConfirmation, setIsConfirmation] = useState(false);
  const history = useHistory();
  const isMobileView = useMediaQuery('screen and (max-width: 800px)');

  useEffect(() => {
    if (recipe) {
      setIsPreview(!recipe.is_confirmed);
    }
  }, [recipe]);

  const handleSubmitRecipe = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      confirmRecipe(recipeId);
      setIsPreview(false);
      setIsConfirmation(true);
    },
    [recipeId],
  );

  const fetchRecipe = useCallback(async () => {
    const results = await getRecipe(recipeId);
    if ('error' in results) {
      if (results.error.message === 'Recipe not found.') {
        history.push('/404');
        return;
      }
      document.title = "Shelly's Recipe Box";
    } else {
      setRecipe(results);
      setLoading(false);
      document.title = results.title;
    }
  }, [history, recipeId]);

  useEffect(() => {
    fetchRecipe();

    return () => {
      document.title = "Shelly's Recipe Box";
    };
  }, [fetchRecipe]);

  if (loading) {
    return <Loading />;
  }

  if (recipe) {
    return (
      <>
        {isConfirmation ? (
          <Confirmation />
        ) : (
          <ButtonPanel id={recipeId} showSubmit={isPreview} handleSubmit={handleSubmitRecipe} />
        )}
        <h1 className={classes.pageTitle}>{recipe.title}</h1>
        {!isMobileView && (
          <button className={classes.printButton} onClick={printRecipe}>
            <FontAwesomeIcon icon={faPrint} />
            <span className={classes.printButtonLabel}>Print Recipe</span>
          </button>
        )}
        <div className={classes.source}>{recipe.submitted_by}</div>
        {recipe.message && <div className={classes.message}>{recipe.message}</div>}
        <div className={classes.recipeBodyFlexContainer}>
          {isMobileView ? (
            <div className={classes.mobileContainer}>
              <LeftPanel recipe={recipe} isMobileView />
            </div>
          ) : (
            <>
              <div className={classes.leftContainer}>
                <LeftPanel recipe={recipe} />
              </div>
              <div className={classes.rightContainer}>
                <RightPanel recipe={recipe} />
              </div>
            </>
          )}
        </div>
      </>
    );
  }

  return <Error />;
};

export default RecipeView;
