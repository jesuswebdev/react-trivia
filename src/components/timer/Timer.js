import React, { useState, useEffect, useRef } from "react";
import { TIMER_TIME } from "../../config";
import { Progress } from "antd";

const secondsToPercentage = seconds => Math.floor((seconds / TIMER_TIME) * 100);

export const Timer = ({ onTimedOut, start, stop }) => {
  const [seconds, setSeconds] = useState(TIMER_TIME);
  const timeoutId = useRef();
  const intervalId = useRef();
  useEffect(() => {
    start();
    setSeconds(TIMER_TIME);
    const tId = setTimeout(() => {
      clearInterval(intervalId.current);
      setSeconds(0);
      onTimedOut();
    }, TIMER_TIME * 1000);
    timeoutId.current = tId;

    return () => {
      clearTimeout(timeoutId.current);
      clearInterval(intervalId.current);
    };
  }, []);

  useEffect(
    () => {
      if (seconds > 0) {
        const iId = setInterval(() => {
          setSeconds(seconds - 1);
        }, 1000);
        intervalId.current = iId;
      }
      return () => {
        clearInterval(intervalId.current);
      };
    },
    [seconds]
  );

  useEffect(
    () => {
      if (stop) {
        clearTimeout(timeoutId.current);
        clearInterval(intervalId.current);
      }
    },
    [stop]
  );

  return (
    <Progress
      style={{ display: "block", textAlign: "center", marginBottom: "24px" }}
      type="circle"
      percent={secondsToPercentage(seconds)}
      status={seconds <= 10 ? "exception" : null}
      format={() => `${seconds}s`}
      width={150}
    />
  );
};

export default Timer;
