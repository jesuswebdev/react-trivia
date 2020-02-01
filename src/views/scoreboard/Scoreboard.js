import React from "react";
import ScoresTable from "./scores-table/ScoresTable";
import StatsProvider from "./stats-provider/StatsProvider";

const Scoreboard = () => {
  return <StatsProvider render={props => <ScoresTable {...props} />} />;
};

export default Scoreboard;
