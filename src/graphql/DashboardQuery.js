import gql from "graphql-tag";

const DashboardQuery = gql`
  query DashboardQuery($count: Int!) {
    lastNumOrders(count: $count) {
      _id
      name
      date
      participants {
        name
      }
    }
  }
`;

export default DashboardQuery;
