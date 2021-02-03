import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectIsAuthenticated } from '../reducers/currentUser';
import AddRecipe from './AddRecipe/AddRecipe';
import Browse from './Browse/Browse';
import EditRecipe from './EditRecipe/EditRecipe';
import Homepage from './HomePage/Homepage';
import LoginForm from './Authentication/LoginForm';
import InvalidRoute from './InvalidRoute/InvalidRoute';
import RecipeView from './RecipeView/RecipeView';
import SearchPage from './Search/SearchPage';
import SignupForm from './Authentication/SignupForm';

const Routes: React.FC = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Switch>
      <Route exact path="/search" component={SearchPage} />
      <Route path="/browse/:name" component={Browse} />
      <Route exact path="/signup">
        {isAuthenticated ? <Redirect to="/" /> : <SignupForm />}
      </Route>
      <Route exact path="/login">
        {isAuthenticated ? <Redirect to="/" /> : <LoginForm />}
      </Route>
      <Route path="/new">{isAuthenticated ? <AddRecipe /> : <Redirect to="/login" />}</Route>
      <Route path="/recipe/:id/edit">
        {isAuthenticated ? <EditRecipe /> : <Redirect to="/login" />}
      </Route>
      <Route path="/recipe/:id" component={RecipeView} />
      <Route exact path="/" component={Homepage} />
      <Route path="/404" component={InvalidRoute} />
      <Route path="*" component={InvalidRoute} />
    </Switch>
  );
};

export default Routes;
