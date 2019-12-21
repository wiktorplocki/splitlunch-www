import React from "react";
import styled from "styled-components";

const StyledFlexLayout = styled.div`
  display: flex;
  height: 100vh;
  flex: 1;
`;

const FlexLayout = ({ children, className }) => (
  <StyledFlexLayout className={className}>{children}</StyledFlexLayout>
);

export default FlexLayout;
