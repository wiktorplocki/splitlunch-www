import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import { Button } from "react-rainbow-components";
import { Card, Layout } from "../../components";
import DashboardQuery from "../../graphql/DashboardQuery";

const StyledCard = styled(Card)`
  width: 100%;
`;

const StyledHeader = styled.h1`
  font-size: 24px;
  font-weight: 300;
  color: #576574;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const ListWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
`;

const Dashboard = () => {
  const { data } = useQuery(DashboardQuery, { variables: { count: 5 } });
  return (
    <Layout.Flex direction="column" fullScreen data-react="dashboard">
      <StyledHeader>
        Welcome to the dashboard! Here are your last five orders:
      </StyledHeader>
      <Layout.Flex direction="column">
        <ListWrapper>
          {data && data.lastNumOrders.length > 0 ? (
            <>
              {data.lastNumOrders.map(order => (
                <StyledCard>dupa</StyledCard>
              ))}
            </>
          ) : (
            <>
              <StyledHeader>No orders created by you!</StyledHeader>
              <StyledLink to="/order/create">
                <Button variant="success" label="Create new order!" />
              </StyledLink>
            </>
          )}
        </ListWrapper>
      </Layout.Flex>
    </Layout.Flex>
  );
};

export default Dashboard;
