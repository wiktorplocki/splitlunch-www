import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

function flexDirection(direction) {
  switch (direction) {
    case "row":
      return "row";
    case "column":
      return "column";
    case "row-reverse":
      return "row-reverse";
    case "column-reverse":
      return "column-reverse";
    default:
      return "row";
  }
}

const StyledFlexLayout = styled.div`
  display: flex;
  height: ${props => props.fullScreen && "100vh"};
  flex: ${props => props.fullScreen && 1};
  flex-direction: ${props => props.direction && flexDirection(props.direction)};
  align-items: ${props => props.absoluteCenter && "center"};
  justify-content: ${props => props.absoluteCenter && "center"};
`;

const FlexLayout = ({
  absoluteCenter,
  direction,
  fullScreen,
  children,
  className
}) => (
  <StyledFlexLayout
    absoluteCenter={absoluteCenter}
    direction={direction}
    fullScreen={fullScreen}
    className={className}
  >
    {children}
  </StyledFlexLayout>
);

FlexLayout.defaultProps = {
  absoluteCenter: false,
  direction: "row",
  fullScreen: false,
  className: undefined
};

FlexLayout.propTypes = {
  absoluteCenter: PropTypes.bool,
  direction: PropTypes.oneOf([
    "row",
    "column",
    "row-reverse",
    "column-reverse"
  ]),
  fullScreen: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired
};

export default FlexLayout;
