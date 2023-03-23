import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import PageNotFound from "../components/PageNotFound";

interface RouteProps {
  path: string;
  component: any;
}

function ProtectedRoute({ path, component }: RouteProps) {
  const state: any = useSelector((state) => state);
  const { isAuthenticated } = state.auth;
  const ResultantComponent = isAuthenticated ? (
    <Switch>
      <Route path={path} exact component={component} />
      <Route path="*" exact component={PageNotFound} />
    </Switch>
  ) : (
    <Redirect to="/login" />
  );
  return ResultantComponent;
}

export default ProtectedRoute;
