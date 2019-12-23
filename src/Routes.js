import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import Loading from "./pages/Loading/Loading";
import Home from "./pages/Home/Home";
import Bye from "./pages/Bye/Bye";

import MeQuery from "./graphql/MeQuery";

const Dashboard = lazy(() => import("./pages/Home/Dashboard"));
const Login = lazy(() => import("./pages/Login/Login"));

const AuthorizedRoute = (error, { me }) => {
  if (!error && me !== null) {
    return true;
  }
  return false;
};

const Routes = () => {
  const { data, error } = useQuery(MeQuery);
  const { me } = data;
  const HomeRoute = () => {
    if (!error && data && data.me !== null) {
      return <Dashboard />;
    }
    return <Home />;
  };

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route
          path="/"
          exact
          component={AuthorizedRoute(error, me) ? Dashboard : Home}
        />
        <Route path="/login" exact component={Login} />
        <Route path="/bye" exact component={Bye} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
