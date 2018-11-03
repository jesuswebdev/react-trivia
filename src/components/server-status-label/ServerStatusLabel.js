import React, { Component } from "react";
import { connect } from "react-redux";
import { pingServer } from "../../state/ui/home/actions";

class ServerStatusLabel extends Component {
  componentDidMount() {
    if (!this.props.success && !this.props.pingError) {
      this.props.pingServer();
    }
  }
  render() {
    return (
      <div
        className="tags has-addons"
        style={{ paddingTop: "100px", justifyContent: "center" }}>
        <span className="tag is-dark">Servidor</span>
        <span
          className={[
            "tag",
            this.props.loading ? "is-info" : "",
            this.props.success ? "is-success" : "",
            this.props.pingError ? "is-danger" : ""
          ].join(" ")}>
          {this.props.status}
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    status: state.ui.home.status,
    loading: state.ui.home.loading,
    pingError: state.ui.home.error,
    success: state.ui.home.success
  };
};

const mapDispatchToProps = dispatch => {
  return {
    pingServer: () => {
      dispatch(pingServer());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServerStatusLabel);
