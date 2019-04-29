/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { A } from 'hookrouter';

import AuthContext from '../../contexts/AuthContext';

const Navbar = () => (
  <AuthContext.Consumer>
    {context => (
      <header className="navbar flex justify-between items-center container mx-auto">
        <div className="left">
          <div className="logo">
            <A href="/">
              <h1>SplitLunch</h1>
            </A>
          </div>
        </div>
        <nav className="right">
          <ul className="list-reset">
            {!context.token && (
              <A href="/login">
                <li>Login</li>
              </A>
            )}
            {context.token && (
              <React.Fragment>
                <A href="/orders">
                  <li>Orders</li>
                </A>
                <li onClick={context.logout}>Logout</li>
              </React.Fragment>
            )}
          </ul>
        </nav>
      </header>
    )}
  </AuthContext.Consumer>
);

export default Navbar;
