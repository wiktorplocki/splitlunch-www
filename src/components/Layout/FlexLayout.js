import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledFlexLayout = styled.div`
  display: flex;
  height: 100vh;
  flex: 1;
  align-items: ${props => props.absoluteCenter && "center"};
  justify-content: ${props => props.absoluteCenter && "center"};
`;

const FlexLayout = ({ absoluteCenter, children, className }) => (
  <StyledFlexLayout absoluteCenter={absoluteCenter} className={className}>
    {children}
  </StyledFlexLayout>
);

FlexLayout.defaultProps = {
  absoluteCenter: false,
  className: undefined
};

FlexLayout.propTypes = {
  absoluteCenter: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired
};

export default FlexLayout;
