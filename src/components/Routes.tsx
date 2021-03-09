import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './SiteFrame/Header/Header';
import Main from './SiteFrame/Main/Main';
import AddRecipe from './AddRecipe/AddRecipe';
import EditRecipe from './EditRecipe/EditRecipe';
import InvalidRoute from './InvalidRoute/InvalidRoute';
import RecipeView from './RecipeView/RecipeView';
import RecipeList from './base/RecipeList/RecipeList';

const Routes: React.FC = () => {
  return (
    <>
      <Header />
      <Main>
        <Switch>
          <Route exact path="/all" component={RecipeList} />
          <Route path="/recipe/:id/edit" component={EditRecipe} />
          <Route path="/recipe/:id" component={RecipeView} />
          <Route path="/404" component={InvalidRoute} />
          <Route exact path={['/', '/new']} component={AddRecipe} />
          <Route path="*" component={InvalidRoute} />
        </Switch>
      </Main>
    </>
  );
};

export default Routes;
