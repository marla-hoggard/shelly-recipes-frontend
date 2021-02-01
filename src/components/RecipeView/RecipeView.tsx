import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { GetRecipeSuccess } from '../../types/recipe.types';
import { getRecipe } from '../../api/recipe';
import Loading from '../base/Loading';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import classes from './RecipeView.module.scss';

const RecipeView: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState<GetRecipeSuccess>();
  const params = useParams<{ id: string }>();
  const recipeId = parseInt(params.id);
  const history = useHistory();

  const [isMobileView, setIsMobileView] = useState(
    () => window.matchMedia('(max-width: 800px)').matches,
  );

  useEffect(() => {
    const handleMediaQuery = (e: MediaQueryListEvent) => {
      setIsMobileView(e.matches);
    };
    window.matchMedia('(max-width: 800px)').addListener(handleMediaQuery);

    return () => {
      window.matchMedia('(max-width: 800px)').removeListener(handleMediaQuery);
    };
  }, []);

  const fetchRecipe = useCallback(async () => {
    const results = await getRecipe(recipeId);
    if ('error' in results) {
      if (results.error.message === 'Recipe not found.') {
        history.push('/404');
        return;
      }
    } else {
      setRecipe(results);
      setLoading(false);
    }
  }, [history, recipeId]);

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
          {recipe.featured && <FontAwesomeIcon className={classes.featuredStar} icon={faStar} />}
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

  return <div>Something went wrong. Please refresh to try again.</div>;
};

export default RecipeView;
