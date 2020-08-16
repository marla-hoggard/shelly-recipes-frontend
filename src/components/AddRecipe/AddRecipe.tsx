import React from "react";

import RecipeForm from "../RecipeForm/RecipeForm";

const AddRecipe: React.FC = () => (
  <RecipeForm savedValues={{ submittedBy: "Marla Hoggard" }} type="add" />
);

export default AddRecipe;
