import React, { Component } from "react";
import axios from "axios";

export class ServerStatusLabel extends Component {
  state = {
    loading: false,
    success: false,
    error: false,
    intervalId: null
  };
  componentDidMount() {
    if (!this.state.success && !this.state.error) {
      this.pingServer();
    }
    const intervalId = setInterval(() => {
      this.pingServer();
    }, 60000);
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
    }
  }

  pingServer() {
    this.setState({
      loading: true,
      success: false,
      error: false
    });
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/health`,
      timeout: 10000
    })
      .then(({ data }) => {
        this.setState({ loading: false, success: true });
      })
      .catch(error => {
        this.setState({ loading: false, error: true });
      });
  }

  render() {
    const { loading, success, error } = this.state;
    const stateTag = loading
      ? "is-info"
      : success
      ? "is-success"
      : error
      ? "is-danger"
      : "";

    return (
      <div
        className="tags has-addons"
        style={{ paddingTop: "100px", justifyContent: "center" }}>
        <span className="tag is-dark">Servidor</span>
        <span className={`tag ${stateTag}`}>
          {loading ? "Conectando..." : success ? "OK" : "ERROR"}
        </span>
      </div>
    );
  }
}

export default ServerStatusLabel;
