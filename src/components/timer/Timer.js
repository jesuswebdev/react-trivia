import React from "react";
import { connect } from "react-redux";
import { TIMER_TIME } from "../../config";
import { Progress } from "antd";

const percentTo = seconds => Math.floor((seconds / TIMER_TIME) * 100);

const percentFrom = percent => Math.ceil((TIMER_TIME * percent) / 100);

export const Timer = ({ seconds }) => {
  return (
    <Progress
      type="circle"
      percent={percentTo(seconds)}
      status={seconds <= 10 ? "exception" : null}
      format={percent => `${percentFrom(percent)}s`}
      width={150}
    />
  );
};

const mapStateToProps = state => {
  return {
    seconds: state.timer.seconds
  };
};

export default connect(mapStateToProps)(Timer);
