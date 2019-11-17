import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { setAccessToken } from '../../helpers/accessToken';

import MeQuery from '../../graphql/MeQuery';
import LogoutMutation from '../../graphql/LogoutMutation';

const Home = () => {
  const { data } = useQuery(MeQuery, { fetchPolicy: 'network-only' });
  const [logout, { client }] = useMutation(LogoutMutation);
  let body = null;
  if (data) {
    body = <div>You are logged in as {data.me.email}</div>;
  } else {
    body = <div>not logged in</div>;
  }
  return (
    <>
      <div>Hello!</div>
      <div>
        <Link to="/login">Login</Link>
      </div>
      <div>
        <Link to="/bye">Bye</Link>
      </div>
      {data && (
        <div>
          <button
            onClick={async () => {
              logout();
              setAccessToken('');
              await client.resetStore();
            }}
            type="button"
          >
            Logout
          </button>
        </div>
      )}
      {body}
    </>
  );
};

export default Home;
