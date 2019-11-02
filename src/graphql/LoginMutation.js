import { gql } from 'apollo-boost';

const LoginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      user {
        _id
      }
    }
  }
`;

export default LoginMutation;
