import React, { useState } from 'react';
import { Button, Card, Input } from 'react-rainbow-components';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { setAccessToken } from '../../accessToken';

import LoginMutation from '../../graphql/LoginMutation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { error }] = useMutation(LoginMutation);

  const onSubmit = e => {
    e.preventDefault();
    login({ variables: { email, password } }).then(({ data }) => {
      if (data && data.login) {
        setEmail('');
        setPassword('');
        fetch(`${process.env.API_URL_LOCAL}/refresh_token`, {
          method: 'POST',
          credentials: 'include'
        })
          .then(res => res.json())
          .then(accessToken => setAccessToken(accessToken));
      }
    });
  };

  return (
    <form className="loginPage" react-data="login" onSubmit={onSubmit}>
      <section className="login__container login__container--fullscreen">
        <p className="login__header">Sign in</p>
        <Card className="login__signinCard">
          <article className="signinCard__inputs--container">
            <Input
              label="Email"
              type="email"
              error={error && error.message}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              error={error && error.message}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <Button variant="brand" label="Login" type="submit" />
            <Link to="/forgot-password" className="signinCard__link">
              Forgot your password?
            </Link>
          </article>
        </Card>
        <Link to="/register" className="login__link">
          Sign up?
        </Link>
      </section>
    </form>
  );
};

export default LoginPage;
