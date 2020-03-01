import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import {
  ButtonIcon,
  VerticalItem,
  VerticalNavigation,
  VerticalSection
} from "react-rainbow-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAccessToken, setAccessToken } from "../../helpers/accessToken";

import LogoutMutation from "../../graphql/LogoutMutation";

const StyledVerticalNavigation = styled(VerticalNavigation)`
  display: ${props => (props.showNav ? "block" : "none")};
  opacity: ${props => (props.showNav ? 1 : 0)};
  border-right: ${props => props.showNav && "3px solid #01b6f5"};
  background-color: #fff;
  height: 100vh;
  transition: all 0.1s linear;
`;

const VerticalNavigationContainer = styled.div`
  border-left: ${props => !props.showNav && "3px solid #01b6f5"};
  display: flex;
  flex-direction: row;
  height: 100vh;

  @media (min-width: 270px) {
    width: ${props => props.showNav && `41.92vw`};
  }

  @media (min-width: 540px) {
    width: ${props => props.showNav && `20.96vw`};
  }

  @media (min-width: 1080px) {
    width: ${props => props.showNav && `10.48vw`};
  }

  @media (min-width: 2160px) {
    width: ${props => props.showNav && `5.24vw`};
  }
`;

const VerticalNavigationToggleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${props => (props.showNav ? `${22.5}px` : `${45}px`)};
  border-left: 3px solid #01b6f5;
`;

const StyledButtonIcon = styled(ButtonIcon)`
  margin-left: ${props => (props.showNav ? `${-22.5}px` : `${-10}px`)};
  z-index: 1000;
`;

const Navigation = () => {
  const [showNav, setShowNav] = useState(true);
  const [logout, { client }] = useMutation(LogoutMutation);
  const history = useHistory();
  const isLoggedIn = getAccessToken() !== "";
  if (isLoggedIn) {
    return (
      <VerticalNavigationContainer react-data="VerticalNavigation">
        <StyledVerticalNavigation showNav={showNav}>
          <VerticalSection>
            <VerticalItem
              name="orders"
              label="My Orders"
              icon={<FontAwesomeIcon icon="receipt" />}
            />
            <VerticalItem
              name="logout"
              label="Logout"
              icon={<FontAwesomeIcon icon="power-off" />}
              onClick={async () => {
                setAccessToken("");
                await logout();
                await client.resetStore();
                history.push("/");
              }}
            />
          </VerticalSection>
        </StyledVerticalNavigation>
        <VerticalNavigationToggleContainer showNav={showNav}>
          <StyledButtonIcon
            showNav={showNav}
            variant="brand"
            icon={
              <FontAwesomeIcon
                icon={showNav ? "chevron-left" : "chevron-right"}
              />
            }
            onClick={() => setShowNav(!showNav)}
          />
        </VerticalNavigationToggleContainer>
      </VerticalNavigationContainer>
    );
  }
  return null;
};

export default Navigation;
