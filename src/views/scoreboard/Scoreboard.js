import React from "react";
import ScoresTable from "./scores-table/ScoresTable";
import StatsProvider from "./stats-provider/StatsProvider";

const Scoreboard = () => {
  return (
    <StatsProvider>
      {(loading, error, stats, selectMode, selectDifficulty) => (
        <ScoresTable
          error={error}
          loading={loading}
          stats={stats}
          selectMode={selectMode}
          selectDifficulty={selectDifficulty}
        />
      )}
    </StatsProvider>
  );
};

export default Scoreboard;
