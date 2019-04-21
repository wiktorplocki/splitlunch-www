import React, { useState } from 'react';
import { useRoutes } from 'hookrouter';
import ReactDOM from 'react-dom';

import './stylesheets/main.css';
import AuthContext from './contexts/AuthContext';

import Navbar from './components/Navbar/Navbar';
import NotFound from './pages/NotFound/NotFound';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';

const App = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [tokenExpiry, setTokenExpiry] = useState(null);

  const login = (passUserId, passToken, passTokenExpiry) => {
    setUserId(passUserId);
    setToken(passToken);
    setTokenExpiry(passTokenExpiry);
  };

  const logout = () => {
    setUserId(null);
    setToken(null);
    setTokenExpiry(null);
  };

  const routes = {
    '/': () => <Main />,
    '/login': () => <Login />
  };
  const routeResult = useRoutes(routes);

  return (
    <React.Fragment>
      <AuthContext.Provider
        value={{ token, tokenExpiry, userId, login, logout }}
      >
        {routeResult ? <Navbar /> : null}
        <React.Fragment>{routeResult || <NotFound />}</React.Fragment>
      </AuthContext.Provider>
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
export default App;
