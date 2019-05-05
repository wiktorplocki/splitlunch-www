import React from 'react';
import { useTitle } from 'hookrouter';
import ListItem from '../../components/ListItem/ListItem';

const Orders = () => {
  useTitle('SplitLunch - Orders');

  return (
    <React.Fragment>
      <h1>Orders</h1>
      <ul>
        <ListItem />
      </ul>
    </React.Fragment>
  );
};

export default Orders;
