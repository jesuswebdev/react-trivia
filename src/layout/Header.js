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
        <Col span={3}>
          <Link to="/" style={styles}>
            React Trivia
          </Link>
        </Col>
        {playing || atHome || (
          <Col span={21}>
            <Menu
              theme="dark"
              mode="horizontal"
              style={{ lineHeight: "64px", float: "right" }}
              selectable={false}>
              <MenuItem>
                <Link to="/nuevo">Jugar</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/posiciones">Top 10</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/contribuir">Contribuir</Link>
              </MenuItem>
            </Menu>
          </Col>
        )}
      </Row>
    </Header>
  );
};

export default withRouter(AppHeader);
