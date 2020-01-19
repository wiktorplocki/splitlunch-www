import React, { useEffect, useState } from "react";
import { Layout } from "./components";
import { setAccessToken } from "./helpers/accessToken";

import { Navigation } from "./components/";

import Loading from "./pages/Loading/Loading";
import ErrorPage from "./pages/Error/ErrorPage";
import Routes from "./Routes";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    async function sendRefreshToken() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/refresh_token`,
          {
            method: "POST",
            credentials: "include"
          }
        );
        if (response) {
          const { accessToken } = await response.json();
          setAccessToken(accessToken);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }
    sendRefreshToken();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <Layout.Flex>
      <Navigation />
      <Routes />
    </Layout.Flex>
  );
}

export default App;
