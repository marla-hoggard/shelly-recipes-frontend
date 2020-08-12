import React from "react";
import { Switch, Route } from "react-router-dom";

import RecipeForm from "./RecipeForm/RecipeForm";
import SearchPage from "./Search/SearchPage";
import EditRecipe from "./EditRecipe/EditRecipe";
import Homepage from "./HomePage/Homepage";
import InvalidRoute from "./InvalidRoute/InvalidRoute";
import RecipeView from "./RecipeView/RecipeView";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/search" component={SearchPage} />
      <Route path="/new" component={RecipeForm} />
      <Route path="/recipe/:id/edit" component={EditRecipe} />
      <Route path="/recipe/:id" component={RecipeView} />
      <Route exact path="/" component={Homepage} />
      <Route path="*" component={InvalidRoute} />
    </Switch>
  );
};

export default Routes;
