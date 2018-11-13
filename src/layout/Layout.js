import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Layout } from "antd";

const AppLayout = ({ children }) => {
  const { Content } = Layout;
  return (
    <Layout>
      <Header />
      <Content style={{ minHeight: window.innerHeight - 64, padding: "32px" }}>
        {children}
      </Content>
      <Footer />
    </Layout>
  );
};

export default AppLayout;
