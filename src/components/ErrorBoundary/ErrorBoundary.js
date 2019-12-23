import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Card, Layout } from "../";

const ErrorBoundaryCard = styled(Card)`
  background-color: rgb(254, 72, 73);
  color: #fff;
  text-align: center;
  padding: 20px;
`;

const ErrorBoundaryHeading = styled.h1`
  font-weight: 600;
  color: #fff;
  text-align: center;
`;

const ErrorBoundaryText = styled.p`
  color: #fff;
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.node])
      .isRequired
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <Layout.Flex absoluteCenter>
          <ErrorBoundaryCard>
            <ErrorBoundaryHeading>Something went wrong.</ErrorBoundaryHeading>
            <ErrorBoundaryText>
              The component crashed. Please try refreshing the page.
            </ErrorBoundaryText>
          </ErrorBoundaryCard>
        </Layout.Flex>
      );
    }
    return children;
  }
}

export default ErrorBoundary;
