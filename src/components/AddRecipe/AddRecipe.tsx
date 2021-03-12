import React from 'react';

import RecipeForm from '../RecipeForm/RecipeForm';

const AddRecipe: React.FC = () => {
  return <RecipeForm type="add" isConfirmed={false} />;
};

export default AddRecipe;
