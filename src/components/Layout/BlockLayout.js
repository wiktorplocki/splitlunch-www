import React from "react";
import styled from "styled-components";

const StyledBlockLayout = styled.div`
  display: block;
  height: 100%;
  width: 100%;
`;

const BlockLayout = ({ className, children }) => (
  <StyledBlockLayout className={className}>{children}</StyledBlockLayout>
);

export default BlockLayout;
