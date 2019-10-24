import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import HelloQuery from './graphql/HelloQuery';

const App = () => {
  const { data, loading, error } = useQuery(HelloQuery);

  if (loading) {
    return <div>loading..</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  return <div>{data.hello}</div>;
};

export default App;
