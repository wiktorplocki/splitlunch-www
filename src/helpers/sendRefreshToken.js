import { setAccessToken } from './accessToken';

const sendRefreshToken = () =>
  fetch(`${process.env.API_URL}/refresh_token`, {
    method: 'POST',
    credentials: 'include'
  })
    .then(res => res.json())
    .then(accessToken => setAccessToken(accessToken));

export default sendRefreshToken;
