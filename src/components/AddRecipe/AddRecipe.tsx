import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectIsAuthenticated } from "../../reducers/currentUser";

import RecipeForm from "../RecipeForm/RecipeForm";

const AddRecipe: React.FC = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/login");
    }
  }, [isAuthenticated, history]);

  return <RecipeForm savedValues={{ submitted_by: "Lynne Glasser" }} type="add" />;
};

export default AddRecipe;
