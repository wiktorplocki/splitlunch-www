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
  height: 100vh;
  flex: 1;
  flex-direction: ${props => props.direction && flexDirection(props.direction)};
  align-items: ${props => props.absoluteCenter && "center"};
  justify-content: ${props => props.absoluteCenter && "center"};
`;

const FlexLayout = ({ absoluteCenter, direction, children, className }) => (
  <StyledFlexLayout
    absoluteCenter={absoluteCenter}
    direction={direction}
    className={className}
  >
    {children}
  </StyledFlexLayout>
);

FlexLayout.defaultProps = {
  absoluteCenter: false,
  direction: "row",
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
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired
};

export default FlexLayout;
