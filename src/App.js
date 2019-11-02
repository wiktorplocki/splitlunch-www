import React, { useEffect } from 'react';
import { location as locationShape } from 'react-router-prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';

import './stylesheets/main.scss';

import Home from './pages/Home';
import Login from './pages/Login';

const App = ({ location }) => {
  useEffect(() => console.log('route changed!'), [location]);
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
    </Switch>
  );
};

App.propTypes = {
  location: locationShape.isRequired
};

export default withRouter(App);
