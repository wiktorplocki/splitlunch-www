import React from 'react';
import styled from 'styled-components';
import useForm from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { Button } from 'react-rainbow-components';
import { Card, Input } from '../../components';
import sendRefreshToken from '../../helpers/sendRefreshToken';

import LoginMutation from '../../graphql/LoginMutation';

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const [login, { error }] = useMutation(LoginMutation);
  const history = useHistory();

  const onSubmit = ({ email, password }) =>
    login({ variables: { email, password } }).then(({ data }) => {
      if (data && data.login) {
        sendRefreshToken().then(history.push('/'));
      }
    });

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

  const StyledCard = styled(Card)`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px;
    width: 360px;
    margin-bottom: 16px;
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

  const ForgotPasswordLink = styled(Link)`
    color: #01b6f5;
    text-align: center;
    font-size: 1rem;
  `;

  return (
    <LoginPageForm react-data="login" onSubmit={handleSubmit(onSubmit)}>
      <FullScreenContainer>
        <Header>Sign in</Header>
        <StyledCard>
          <InputsContainer>
            <Input
              label="Email"
              name="email"
              type="email"
              required
              ref={register}
              error={error && error.message}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              required
              ref={register}
              error={error && error.message}
            />
            <Button variant="brand" label="Login" type="submit" />
            <ForgotPasswordLink to="/forgot-password">
              Forgot your password?
            </ForgotPasswordLink>
          </InputsContainer>
        </StyledCard>
        <Link to="/register">Sign up?</Link>
      </FullScreenContainer>
    </LoginPageForm>
  );
};

export default LoginPage;
