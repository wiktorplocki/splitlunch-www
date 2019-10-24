import { gql } from 'apollo-boost';

const HelloQuery = gql`
  query Hello {
    hello
  }
`;

export default HelloQuery;
