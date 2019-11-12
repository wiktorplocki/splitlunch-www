import { setAccessToken } from './accessToken';

const url =
  process.env.NODE_ENV === 'development'
    ? process.env.API_URL_LOCAL
    : process.env.API_URL;

const sendRefreshToken = () =>
  fetch(`${url}/refresh_token`, {
    method: 'POST',
    credentials: 'include'
  })
    .then(res => res.json())
    .then(accessToken => setAccessToken(accessToken));

export default sendRefreshToken;
