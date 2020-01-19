import gql from "graphql-tag";

const NewOrderMutation = gql`
  mutation NewOrderMutation($order: OrderInput!) {
    createOrder(order: $order) {
      _id
    }
  }
`;

export default NewOrderMutation;
