import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledBlockLayout = styled.div`
  display: block;
  height: 100%;
  width: 100%;
`;

const BlockLayout = ({ className, children }) => (
  <StyledBlockLayout className={className}>{children}</StyledBlockLayout>
);

export default BlockLayout;

BlockLayout.defaultProps = {
  className: undefined
};

BlockLayout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired
};
