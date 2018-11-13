import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu, Row, Col } from "antd";

const MenuItem = Menu.Item;
const { Header } = Layout;
const styles = {
  display: "inline-block",
  textDecoration: "none",
  color: "white"
};

const AppHeader = props => {
  const path = props.location.pathname;
  const playing = path === "/jugar";
  const atHome = path === "/";
  return (
    <Header>
      <Row>
        <Col xs={6} md={3}>
          <Link to="/" style={styles}>
            React Trivia
          </Link>
        </Col>
        {playing || atHome ? null : (
          <Col xs={18} md={21}>
            <Menu
              theme="dark"
              mode="horizontal"
              style={{ lineHeight: "64px", float: "right" }}
              selectable={false}>
              {path !== "/nuevo" && (
                <MenuItem>
                  <Link to="/nuevo">Jugar</Link>
                </MenuItem>
              )}
              {path !== "/posiciones" && (
                <MenuItem>
                  <Link to="/posiciones">Top 10</Link>
                </MenuItem>
              )}
              {path !== "/contribuir" && (
                <MenuItem>
                  <Link to="/contribuir">Contribuir</Link>
                </MenuItem>
              )}
            </Menu>
          </Col>
        )}
      </Row>
    </Header>
  );
};

export default withRouter(AppHeader);
