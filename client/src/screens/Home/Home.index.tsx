import React from "react";
import { useSelector } from "react-redux";
import Layout from "../../layouts/MainLayout/MainLayout.index";

import Loading from "../../components/Loading";

function Home() {
  const state: any = useSelector((state) => state);
  const isLoading = state.isLoading;

  return (
    <>
      {isLoading && <Loading />}
      <Layout>
        <div>Here</div>
      </Layout>
    </>
  );
}

export default Home;
