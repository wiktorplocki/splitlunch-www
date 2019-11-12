import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Card, Input } from 'react-rainbow-components';
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import sendRefreshToken from '../../helpers/sendRefreshToken';

import LoginMutation from '../../graphql/LoginMutation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { error }] = useMutation(LoginMutation);
  const history = useHistory();

  const onSubmit = e => {
    e.preventDefault();
    login({ variables: { email, password } }).then(({ data }) => {
      if (data && data.login) {
        sendRefreshToken().then(history.push('/'));
      }
    });
  };

  const LoginPageForm = styled.form`
    font-family: 'Lato', sans-serif;
  `;

  const FullScreenContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex: 1;
  `;

  const Header = styled.p`
    font-size: 24px;
    font-weight: 300;
    text-align: center;
    color: #576574;
    margin: 16px 20px;
  `;

  const InputsContainer = styled.div`
    display: flex;
    flex-direction: column;
    & > :not(:first-child) {
      margin-top: 24px;
    }
    & > :last-child {
      margin-top: 16px;
    }
  `;

  return (
    <LoginPageForm react-data="login" onSubmit={onSubmit}>
      <FullScreenContainer>
        <Header>Sign in</Header>
        <Card className="login__signinCard">
          <InputsContainer>
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
            <Link to="/forgot-password" className="login__forgot-pw-link">
              Forgot your password?
            </Link>
          </InputsContainer>
        </Card>
        <Link to="/register" className="login__link">
          Sign up?
        </Link>
      </FullScreenContainer>
    </LoginPageForm>
  );
};

export default LoginPage;
