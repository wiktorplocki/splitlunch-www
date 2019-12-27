import React from "react";
import useForm from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { Button } from "react-rainbow-components";
import {
  ForgotPasswordLink,
  FullScreenContainer,
  Header,
  InputsContainer,
  PageForm,
  StyledCard
} from "../+Components/StyledComponents";
import { Input } from "../../components";
import { setAccessToken } from "../../helpers/accessToken";

import LoginMutation from "../../graphql/LoginMutation";
import MeQuery from "../../graphql/MeQuery";

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const [login, { error }] = useMutation(LoginMutation);
  const history = useHistory();

  const onSubmit = ({ email, password }) =>
    login({
      variables: { email, password },
      update: (store, { data }) => {
        if (!data) {
          return null;
        }

        store.writeQuery({
          query: MeQuery,
          data: {
            me: data.login.user
          }
        });
      }
    }).then(({ data }) => {
      if (data && data.login) {
        setAccessToken(data.login.accessToken);
        history.push("/");
      }
    });

  return (
    <PageForm react-data="login" onSubmit={handleSubmit(onSubmit)}>
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
            <Button variant="brand" label="Sign in" type="submit" />
            <ForgotPasswordLink to="#">
              Forgot your password?
            </ForgotPasswordLink>
          </InputsContainer>
        </StyledCard>
        <Link to="register">Sign up?</Link>
      </FullScreenContainer>
    </PageForm>
  );
};

export default LoginPage;
