import React, { lazy, useEffect, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { setAccessToken } from './helpers/accessToken';

import Loading from './pages/Loading/Loading';
import Bye from './pages/Bye/Bye';

const Home = lazy(() => import('./pages/Home/Home'));
const Login = lazy(() => import('./pages/Login/Login'));

const App = () => {
  useEffect(
    () =>
      fetch(`${process.env.API_URL}/refresh_token`, {
        method: 'POST',
        credentials: 'include'
      }).then(async response => {
        const { accessToken } = await response.json();
        setAccessToken(accessToken);
      }),
    []
  );
  return (
    <Suspense fallback={Loading}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/bye" exact component={Bye} />
        <Route path="/loading" exact component={Loading} />
      </Switch>
    </Suspense>
  );
};

export default App;
