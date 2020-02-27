import gql from "graphql-tag";

const NewOrderMutation = gql`
  mutation NewOrderMutation($order: OrderInput) {
    createOrder(OrderInput: $order) {
      _id
    }
  }
`;

export default NewOrderMutation;
