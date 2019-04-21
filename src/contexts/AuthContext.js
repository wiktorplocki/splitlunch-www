import { createContext } from 'react';

export default createContext({
  token: null,
  userId: null,
  tokenExpiry: null,
  login: (userId, token, tokenExpiry) => {},
  logout: () => {}
});
