import React, { useState, useEffect } from 'react';
import { useRoutes, useRedirect } from 'hookrouter';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';

import './stylesheets/main.css';
import AuthContext from './contexts/AuthContext';

import verifyTokenMutation from './mutations/verifyTokenMutation.gql';

import Navbar from './components/Navbar/Navbar';
import NotFound from './pages/NotFound/NotFound';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import Orders from './pages/Orders/Orders';
import getQueryFromGQLFile from './queries/getQuery';

const App = () => {
  useEffect(() => {
    const cookieToken = Cookies.get('SPLITLUNCH_TOKEN');
    if (cookieToken) {
      const parsedCookie = JSON.parse(cookieToken);
      // eslint-disable-next-line no-use-before-define
      verifyToken(parsedCookie.token);
    }
  }, []);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [tokenExpiry, setTokenExpiry] = useState(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const redirect = (from, to) => useRedirect(from, to);

  const login = (passToken, passTokenExpiry, passUserId) => {
    setUserId(passUserId);
    setToken(passToken);
    setTokenExpiry(passTokenExpiry);
  };

  const logout = () => {
    setUserId(null);
    setToken(null);
    setTokenExpiry(null);
    Cookies.remove('SPLITLUNCH_TOKEN');
  };

  const verifyToken = passToken => {
    const mutation = {
      query: getQueryFromGQLFile(verifyTokenMutation),
      variables: { token: passToken }
    };
    fetch(process.env.API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mutation)
    })
      .then(res => res.json())
      .then(result => {
        const {
          data: {
            // eslint-disable-next-line no-shadow
            verifyToken: { exp, userId }
          },
          errors
        } = result;
        if (exp || userId) {
          const expHrs = new Date(exp * 1000).getHours();
          login(passToken, expHrs, userId);
        }
        if (errors) {
          redirect('/', '/login');
        }
      })
      .catch(err => {
        console.error(err);
        redirect('/', '/login');
      });
  };

  const routes = {
    '/': () => <Main />,
    '/login': () => <Login />,
    '/orders': () =>
      // eslint-disable-next-line no-unused-expressions
      token && userId && tokenExpiry ? (
        <Orders />
      ) : (
        redirect('/orders', '/login')
      )
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
