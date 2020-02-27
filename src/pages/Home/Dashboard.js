import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import { Button } from "react-rainbow-components";
import { Card, Layout } from "../../components";
import DashboardQuery from "../../graphql/DashboardQuery";

const StyledCard = styled(Card)`
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 10px;
  margin-right: 10px;
`;

const StyledCardHeading = styled.div`
  height: 100px;
  width: 100%;
  text-align: center;
`;

const StyledCardTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #576574;
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
  console.log(data);
  return (
    <Layout.Flex direction="column" fullScreen data-react="dashboard">
      <StyledHeader>
        Welcome to the dashboard! Here are your last five orders:
      </StyledHeader>
      <Layout.Flex direction="column">
        <ListWrapper>
          {data && data.lastNumOrders.length > 0 ? (
            <>
              {data.lastNumOrders.map(({ _id, name, date, participants }) => (
                <StyledCard key={_id}>
                  <StyledCardHeading>
                    <StyledCardTitle>{name}</StyledCardTitle>
                  </StyledCardHeading>
                </StyledCard>
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
