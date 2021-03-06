import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/browser";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronLeft,
  faChevronRight,
  faPowerOff,
  faReceipt
} from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { ApolloLink, Observable } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";
import { getAccessToken, setAccessToken } from "./helpers/accessToken";
import "./normalize.css";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { ErrorBoundary } from "./components";

Sentry.init({ dsn: process.env.REACT_APP_SENTRY_CLIENT_DSN });

library.add(faChevronLeft, faChevronRight, faPowerOff, faReceipt);

const cache = new InMemoryCache({});

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle;
      Promise.resolve(operation)
        .then(nextOperation => {
          const acceptEncoding = {
            "Accept-Encoding": "br"
          };
          const accessToken = getAccessToken();
          if (accessToken) {
            nextOperation.setContext({
              headers: {
                authorization: `Bearer ${accessToken}`,
                ...acceptEncoding
              }
            });
          } else {
            nextOperation.setContext({
              headers: acceptEncoding
            });
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          });
        })
        .catch(observer.error.bind(observer));
      return () => {
        if (handle) {
          handle.unsubscribe();
        }
      };
    })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: "accessToken",
      isTokenValidOrUndefined: () => {
        const token = getAccessToken();
        if (!token) {
          return true;
        }
        try {
          const { exp } = jwtDecode(token);
          if (Date.now() >= exp * 1000) {
            return false;
          }
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      },
      fetchAccessToken: () =>
        fetch(`${process.env.REACT_APP_API_URL}/refresh_token`, {
          method: "POST",
          credentials: "include"
        }),
      handleFetch: accessToken => setAccessToken(accessToken),
      handleError: err => {
        console.warn("Your refresh token is invalid. Try to relogin");
        console.error(err);
      }
    }),
    onError(({ graphQLErrors, networkError }) => {
      console.error(graphQLErrors);
      console.error(networkError);
    }),
    requestLink,
    new HttpLink({
      uri: `${process.env.REACT_APP_API_URL}/graphql`,
      credentials: "include"
    })
  ]),
  cache,
  connectToDevTools: process.env.NODE_ENV !== "production"
});

ReactDOM.render(
  <ErrorBoundary>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </ErrorBoundary>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
