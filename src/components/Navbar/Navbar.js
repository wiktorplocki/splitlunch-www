import React from 'react';

import AuthContext from '../../contexts/AuthContext';

const Navbar = props => (
  <AuthContext.Consumer>
    {context => (
      <header className="navbar flex justify-between items-center container mx-auto">
        <div className="left">
          <div className="logo">
            <h1>SplitLunch</h1>
          </div>
        </div>
        <nav className="right">
          <ul className="list-reset">
            {!context.token && <li>Login</li>}
            {context.token && (
              <React.Fragment>
                <li>Orders</li>
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
