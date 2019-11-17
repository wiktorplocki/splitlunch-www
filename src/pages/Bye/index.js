import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import ByeQuery from '../../graphql/ByeQuery';

const Bye = () => {
  const { data, error } = useQuery(ByeQuery);
  if (error) {
    return (
      <>
        <div>{error.message}</div>
        <Link to="/">Back</Link>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <div>no data</div>
        <Link to="/">Back</Link>
      </>
    );
  }

  if (data) {
    return (
      <>
        <div>{data.bye}</div>
        <Link to="/">Back</Link>
      </>
    );
  }
};

export default Bye;
