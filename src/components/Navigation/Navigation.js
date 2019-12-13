import React from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import { useLocation } from "react-router-dom";
import {
  VerticalItem,
  VerticalNavigation,
  VerticalSection
} from "react-rainbow-components";
import { getAccessToken, setAccessToken } from "../../helpers/accessToken";

import LogoutMutation from "../../graphql/LogoutMutation";

import HeaderNavbar from "./HeaderNavbar";

const StyledVerticalNavigation = styled(VerticalNavigation)`
  max-width: 220px;
`;

const Navigation = () => {
  const [logout, { client }] = useMutation(LogoutMutation);
  const { pathname } = useLocation();
  if (getAccessToken() !== "") {
    return (
      <StyledVerticalNavigation>
        <VerticalSection>
          <VerticalItem name="orders" label="My Orders" />
          <VerticalItem
            name="logout"
            label="Logout"
            onClick={async () => {
              logout();
              setAccessToken("");
              await client.resetStore();
            }}
          />
        </VerticalSection>
      </StyledVerticalNavigation>
    );
  }
  if (getAccessToken() === "" && pathname === "/") {
    return <HeaderNavbar />;
  }
  return null;
};

export default Navigation;
