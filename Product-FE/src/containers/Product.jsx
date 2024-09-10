import React from "react";
import ProductTable from "../components/ProductTable";
import Layout from "antd/es/layout/layout";

const { Header } = Layout;

const ProductPage = () => {
  return (
    <Layout>
      <Header className="header">Products</Header>
      <ProductTable />
    </Layout>
  );
};

export default ProductPage;
