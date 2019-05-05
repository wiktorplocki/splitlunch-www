/* eslint-disable no-unused-vars */
import { createContext } from 'react';

export default createContext({
  token: null,
  userId: null,
  tokenExpiry: null,
  login: (token, userId, tokenExpiry) => {},
  logout: () => {},
  verifyToken: token => {}
});
