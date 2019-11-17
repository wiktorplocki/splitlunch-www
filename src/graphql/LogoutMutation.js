import gql from 'graphql-tag';

const LogoutMutation = gql`
  mutation Logout {
    logout
  }
`;

export default LogoutMutation;
