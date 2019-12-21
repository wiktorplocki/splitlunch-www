import React from "react";
import { Layout } from "../../components";
import { HeaderNavbar } from "../../components";

const Home = () => {
  return (
    <Layout.Block data-react="home">
      <HeaderNavbar />
      <h1>Welcome home!</h1>
    </Layout.Block>
  );
};

export default Home;
