import React, { Fragment } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = (props) => {
    return (
      <Fragment>
        <Header />
        <section className="section has-background-light" style={{minHeight: '75vh'}}>
          <div className="container">{props.children}</div>
        </section>
        <Footer />
      </Fragment>
    );
  
};

export default Layout;
