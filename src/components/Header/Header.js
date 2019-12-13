import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: ${props => (props.navbar ? "flex-end" : "space-between")};
  align-content: center;
  align-items: center;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  background-color: #fff;
  border-radius: 0.875rem 0.875rem 0 0;
  border-bottom: 1px solid #e3e5ed;
`;

const Header = ({ navbar, children }) => (
  <HeaderWrapper navbar={navbar}>{children}</HeaderWrapper>
);

Header.defaultProps = {
  navbar: false
};

Header.propTypes = {
  navbar: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired
};

export default Header;
