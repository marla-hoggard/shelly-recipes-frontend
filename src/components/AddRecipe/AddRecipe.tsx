import React from "react";

import { addRecipe } from "../../api";
import RecipeForm from "../RecipeForm/RecipeForm";
import classes from "./AddRecipe.module.scss";

const AddRecipe: React.FC = () => (
  <>
    <h1 className={classes.pageTitle}>Add a New Recipe</h1>
    <RecipeForm savedValues={{ submittedBy: "Marla Hoggard" }} submitFn={addRecipe} />
  </>
);

export default AddRecipe;
