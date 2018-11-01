import React from "react";
import { connect } from "react-redux";

const Timer = ({seconds}) => <div>{seconds}s</div>;

const mapStateToProps = state => {
  return {
    seconds: state.timer.seconds
  };
};

export default connect(mapStateToProps)(Timer);
