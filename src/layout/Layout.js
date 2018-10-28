import React from "react";
import Aux from "../components/aux/Aux";
import Header from "./Header";
import Footer from "./Footer";

const Layout = (props) => {
    return (
      <Aux>
        <Header />
        <section className="section has-background-light" style={{minHeight: '75vh'}}>
          <div className="container">{props.children}</div>
        </section>
        <Footer />
      </Aux>
    );
  
};

export default Layout;
