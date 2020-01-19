import gql from "graphql-tag";

const MeQuery = gql`
  query Me {
    me {
      _id
    }
  }
`;

export default MeQuery;
