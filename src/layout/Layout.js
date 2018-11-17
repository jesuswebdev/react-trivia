import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Layout } from "antd";

class AppLayout extends React.Component {
  state = {
    minHeight: window.innerHeight - 133,
    padding: "32px"
  };

  setHeight = () => this.setState({ minHeight: window.innerHeight - 133 });

  componentDidMount() {
    window.addEventListener("resize", this.setHeight);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setHeight);
  }

  render() {
    const { Content } = Layout;
    const { children } = this.props;
    return (
      <Layout>
        <Header />
        <Content style={this.state}>{children}</Content>
        <Footer />
      </Layout>
    );
  }
}

export default AppLayout;
