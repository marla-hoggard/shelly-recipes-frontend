import React from "react";

import RecipeForm from "../RecipeForm/RecipeForm";

const AddRecipe: React.FC = () => (
  <RecipeForm savedValues={{ submitted_by: "Lynne Glasser" }} type="add" />
);

export default AddRecipe;
