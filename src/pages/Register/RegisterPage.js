import React from "react";
import { useForm } from "react-hook-form";
import {
  Header,
  InputsContainer,
  PageForm,
  StyledCard,
  StyledLink
} from "../+Components/StyledComponents";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { Button } from "react-rainbow-components";
import { Input, Layout } from "../../components";

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
      <Layout.Flex absoluteCenter direction="column" fullScreen>
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
      </Layout.Flex>
    </PageForm>
  );
};

export default RegisterPage;
