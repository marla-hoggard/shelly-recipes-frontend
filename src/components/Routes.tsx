import React from "react";
import { Switch, Route } from "react-router-dom";

import AddRecipe from "./AddRecipe/AddRecipe";
import EditRecipe from "./EditRecipe/EditRecipe";
import Homepage from "./HomePage/Homepage";
import LoginForm from "./Authentication/LoginForm";
import InvalidRoute from "./InvalidRoute/InvalidRoute";
import RecipeView from "./RecipeView/RecipeView";
import SearchPage from "./Search/SearchPage";
import SignupForm from "./Authentication/SignupForm";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/search" component={SearchPage} />
      <Route exact path="/signup" component={SignupForm} />
      <Route exact path="/login" component={LoginForm} />
      <Route path="/new" component={AddRecipe} />
      <Route path="/recipe/:id/edit" component={EditRecipe} />
      <Route path="/recipe/:id" component={RecipeView} />
      <Route exact path="/" component={Homepage} />
      <Route path="/404" component={InvalidRoute} />
      <Route path="*" component={InvalidRoute} />
    </Switch>
  );
};

export default Routes;
