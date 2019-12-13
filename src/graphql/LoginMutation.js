import gql from "graphql-tag";

const LoginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      user {
        _id
        email
      }
    }
  }
`;

export default LoginMutation;
