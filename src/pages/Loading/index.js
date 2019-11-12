import React from 'react';
import styled from 'styled-components';
import { Spinner } from 'react-rainbow-components';

const Loading = () => {
  const FlexFullPageCenterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    flex: 1;
  `;

  return (
    <FlexFullPageCenterContainer react-data="loading">
      <Spinner />
    </FlexFullPageCenterContainer>
  );
};

export default Loading;
