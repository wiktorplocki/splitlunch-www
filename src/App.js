import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { setAccessToken } from "./helpers/accessToken";

import { Navigation } from "./components/";

import Loading from "./pages/Loading/Loading";
import Routes from "./Routes";

import MeQuery from "./graphql/MeQuery";

function App() {
  const [loading, setLoading] = useState(true);
  const { data } = useQuery(MeQuery);
  useEffect(() => {
    async function sendRefreshToken() {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/refresh_token`,
        {
          method: "POST",
          credentials: "include"
        }
      );
      const { accessToken } = await response.json();
      setAccessToken(accessToken);
      setLoading(false);
    }
    sendRefreshToken();
  }, []);

  const AppContainer = styled.div`
    display: ${() => (data && data.me !== null ? "flex" : "block")};
  `;

  if (loading) {
    return <Loading />;
  }

  return (
    <AppContainer>
      <Navigation />
      <Routes />
    </AppContainer>
  );
}

export default App;
