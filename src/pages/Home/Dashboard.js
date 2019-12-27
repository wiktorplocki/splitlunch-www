import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Layout } from "../../components";
import DashboardQuery from "../../graphql/DashboardQuery";

const Dashboard = () => {
  const { data } = useQuery(DashboardQuery, { variables: { count: 5 } });
  return (
    <Layout.Flex direction="column" data-react="dashboard">
      <h1>Welcome to the dashboard! Here are your last five orders:</h1>
      <Layout.Flex direction="column">
        <div>Something something</div>
      </Layout.Flex>
    </Layout.Flex>
  );
};

export default Dashboard;
