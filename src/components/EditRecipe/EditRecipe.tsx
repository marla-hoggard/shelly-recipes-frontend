import React, { useEffect, useCallback, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { getRecipe } from '../../api/recipe';
import RecipeForm, { FormValues } from '../RecipeForm/RecipeForm';

const EditRecipe: React.FC = () => {
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [savedValues, setSavedValues] = useState<Partial<FormValues>>({});
  const [isConfirmed, setIsConfirmed] = useState(false);

  const fetchRecipeData = useCallback(async () => {
    const recipe = await getRecipe(id);
    if ('id' in recipe) {
      setSavedValues({
        ...recipe,
        servings: recipe.servings || '',
        ingredientsTextarea: recipe.ingredients.join('\n'),
        steps: recipe.steps.join('\n\n'),
        footnotes: recipe.footnotes,
      });
      setIsConfirmed(recipe.is_confirmed);
      setLoading(false);
    } else {
      history.push('/404');
    }
  }, [history, id]);

  useEffect(() => {
    fetchRecipeData();
  }, [fetchRecipeData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <RecipeForm savedValues={savedValues} isConfirmed={isConfirmed} type="edit" id={id} />;
};

export default EditRecipe;
