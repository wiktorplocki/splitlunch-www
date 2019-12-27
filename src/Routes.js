import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import Loading from "./pages/Loading/Loading";
import Home from "./pages/Home/Home";

import MeQuery from "./graphql/MeQuery";

const Dashboard = lazy(() => import("./pages/Home/Dashboard"));
const Login = lazy(() => import("./pages/Login/LoginPage"));
const Register = lazy(() => import("./pages/Register/RegisterPage"));

const AuthorizedRoute = (error, data) => {
  if (error || !data || !data.me || data.me === null) {
    return false;
  }
  return true;
};

const Routes = () => {
  const { data, error } = useQuery(MeQuery);

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route
          path="/"
          exact
          component={AuthorizedRoute(error, data) ? Dashboard : Home}
        />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
