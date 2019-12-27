import React from "react";
import useForm from "react-hook-form";
import {
  FullScreenContainer,
  Header,
  InputsContainer,
  PageForm,
  StyledCard,
  StyledLink
} from "../+Components/StyledComponents";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { Button } from "react-rainbow-components";
import { Input } from "../../components";

import RegisterMutation from "../../graphql/RegisterMutation";

const RegisterPage = () => {
  const { register, handleSubmit } = useForm();
  const [registerUser, { error }] = useMutation(RegisterMutation);
  const history = useHistory();

  const onSubmit = ({ email, password }) =>
    registerUser({
      variables: { email, password }
    }).then(({ data }) => {
      if (data && data.register && data.register === true) {
        history.push("/login");
      }
    });
  return (
    <PageForm react-data="register" onSubmit={handleSubmit(onSubmit)}>
      <FullScreenContainer>
        <Header>Register</Header>
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
            <Button variant="brand" label="Register" type="submit" />
          </InputsContainer>
        </StyledCard>
        <StyledLink to="/login">Login</StyledLink>
      </FullScreenContainer>
    </PageForm>
  );
};

export default RegisterPage;
