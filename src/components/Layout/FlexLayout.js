import React from "react";
import styled from "styled-components";

const StyledFlexLayout = styled.div`
  display: flex;
  height: 100vh;
  flex: 1;
`;

const FlexLayout = ({ children }) => (
  <StyledFlexLayout>{children}</StyledFlexLayout>
);

export default FlexLayout;
