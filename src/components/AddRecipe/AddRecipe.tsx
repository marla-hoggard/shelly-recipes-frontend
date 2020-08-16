import React from "react";

import RecipeForm from "../RecipeForm/RecipeForm";
import classes from "./AddRecipe.module.scss";

const AddRecipe: React.FC = () => (
  <>
    <h1 className={classes.pageTitle}>Add a New Recipe</h1>
    <RecipeForm savedValues={{ submittedBy: "Marla Hoggard" }} type="add" />
  </>
);

export default AddRecipe;
