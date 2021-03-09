import React, { useEffect, useState } from 'react';
import { Recipe as RecipeType } from '../../../types/recipe.types';
import { getAllRecipes } from '../../../api/recipe';
import RecipeListItem from './RecipeListItem';
import classes from './RecipeList.module.scss';

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  useEffect(() => {
    const fetchAllRecipes = async () => {
      const result = await getAllRecipes();
      setRecipes(result);
    };

    fetchAllRecipes();
  }, []);

  return (
    <div className={classes.recipeListContainer}>
      {recipes.map((recipe) => (
        <RecipeListItem key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;
