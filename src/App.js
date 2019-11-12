import React, { lazy, useEffect, Suspense } from 'react';
import { location as locationShape } from 'react-router-prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';

import './stylesheets/main.scss';

import Loading from './pages/Loading';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));

const App = ({ location }) => {
  useEffect(() => console.log('route changed!'), [location]);
  return (
    <Suspense fallback={Loading}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/logout" exact component={Home} />
        <Route path="/loading" exact component={Loading} />
      </Switch>
    </Suspense>
  );
};

App.propTypes = {
  location: locationShape.isRequired
};

export default withRouter(App);
