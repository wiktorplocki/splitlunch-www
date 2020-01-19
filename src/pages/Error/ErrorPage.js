import React from "react";
import styled from "styled-components";
import { Card, Layout } from "../../components/";

const ErrorMessageCard = styled(Card)`
  background-color: rgb(254, 72, 73);
  color: #fff;
  text-align: center;
  padding: 20px;
`;

const ErrorMessageHeading = styled.h1`
  font-weight: 600;
  color: #fff;
  text-align: center;
`;

const ErrorMessageText = styled.p`
  color: #fff;
`;

const ErrorPage = () => (
  <Layout.Flex absoluteCenter fullScreen>
    <ErrorMessageCard>
      <ErrorMessageHeading>Something went wrong.</ErrorMessageHeading>
      <ErrorMessageText>
        Could not connect. Check your internet connection and try again.
      </ErrorMessageText>
    </ErrorMessageCard>
  </Layout.Flex>
);

export default ErrorPage;
