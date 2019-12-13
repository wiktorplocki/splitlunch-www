import gql from "graphql-tag";

const RegisterMutation = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $$password)
  }
`;

export default RegisterMutation;
