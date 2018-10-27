import React from "react";
import Aux from "../components/aux/Aux";
import Header from "./Header";
import Footer from "./Footer";
import LogoutModal from "../components/logout-modal/LogoutModal";

const Layout = (props) => {
    return (
      <Aux>
        <Header />
        <section className="section has-background-light" style={{minHeight: '75vh'}}>
          <div className="container">{props.children}</div>
        </section>
        <Footer />
        {props.modalOpen && <LogoutModal />}
      </Aux>
    );
  
};

export default Layout;
