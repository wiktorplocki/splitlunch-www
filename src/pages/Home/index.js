import React from 'react';
import { Link } from 'react-router-dom';
import useCookie from '../../hooks/useCookie';

const Home = () => (
  <>
    <div>Hello!</div>
    {useCookie('jid') ? (
      <Link to="/logout">Logout</Link>
    ) : (
      <Link to="/login">Login</Link>
    )}
  </>
);

export default Home;
