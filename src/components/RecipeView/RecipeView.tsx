import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { GetRecipeSuccess } from '../../types/recipe.types';
import { getRecipe } from '../../api/recipe';
import useMediaQuery from '../../hooks/useMediaQuery';
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
  const history = useHistory();
  const isMobileView = useMediaQuery('screen and (max-width: 800px)');

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
        <h1 className={classes.pageTitle}>{recipe.title}</h1>
        {!isMobileView && (
          <button className={classes.printButton} onClick={printRecipe}>
            <FontAwesomeIcon icon={faPrint} />
            <span className={classes.printButtonLabel}>Print Recipe</span>
          </button>
        )}
        <div className={classes.source}>{recipe.submitted_by}</div>
        <div className={classes.recipeBodyFlexContainer}>
          {isMobileView ? (
            <div className={classes.mobileContainer}>
              <LeftPanel recipe={recipe} recipeId={recipeId} isMobileView />
            </div>
          ) : (
            <>
              <div className={classes.leftContainer}>
                <LeftPanel recipe={recipe} recipeId={recipeId} />
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
