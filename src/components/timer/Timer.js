import React, { Component } from "react";
import { connect } from "react-redux";

class Timer extends Component {
  render() {
    return <div>{this.props.seconds}s</div>;
  }
}

const mapStateToProps = state => {
  return {
    seconds: state.timer.seconds
  };
};

export default connect(mapStateToProps)(Timer);
