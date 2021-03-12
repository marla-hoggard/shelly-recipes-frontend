import React, { useEffect, useState } from 'react';
import { Recipe as RecipeType } from '../../../types/recipe.types';
import { getAllRecipes, getConfirmedRecipes } from '../../../api/recipe';
import RecipeListItem from './RecipeListItem';
import classes from './RecipeList.module.scss';
import { useLocation } from 'react-router-dom';

const RecipeList: React.FC = () => {
  const { search } = useLocation();
  const [recipes, setRecipes] = useState<RecipeType[]>([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(search);
    const includeUnconfirmed = urlParams.get('confirmed') === 'false';
    const fetchRecipes = async () => {
      const result = includeUnconfirmed ? await getAllRecipes() : await getConfirmedRecipes();
      setRecipes(result);
    };

    fetchRecipes();
  }, [search]);

  return (
    <div className={classes.recipeListContainer}>
      {recipes.map((recipe) => (
        <RecipeListItem key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;
