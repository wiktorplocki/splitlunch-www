import gql from 'graphql-tag';

const HelloQuery = gql`
  query Hello {
    hello
  }
`;

export default HelloQuery;
