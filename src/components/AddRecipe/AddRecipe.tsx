import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUserFullName } from '../../reducers/currentUser';

import RecipeForm from '../RecipeForm/RecipeForm';

const AddRecipe: React.FC = () => {
  const currentUserFullName = useSelector(selectCurrentUserFullName);

  return <RecipeForm savedValues={{ submitted_by: currentUserFullName }} type="add" />;
};

export default AddRecipe;
