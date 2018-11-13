import { Component } from "react";
import { connect } from "react-redux";
import { http } from "../../../utils";
import { getGameStatsSuccess } from "../../../state/game/actions";

class StatsProvider extends Component {
  state = {
    loading: false,
    error: false,
    mode: "fast",
    difficulty: "easy"
  };

  componentDidMount() {
    this.setState({ loading: true, error: false }, async () => {
      try {
        const { data } = await http.get("/games/top");
        this.props.getGameStats(data);
        this.setState({ loading: false });
      } catch (error) {
        this.setState({ loading: false, error: true });
      }
    });
  }

  selectMode = mode => this.setState({ mode });

  selectDifficulty = difficulty => this.setState({ difficulty });

  render() {
    const { loading, error, mode, difficulty } = this.state;
    const { stats } = this.props;
    const currentStats = ((stats || {})[difficulty] || {})[mode] || [];
    return this.props.children(
      loading,
      error,
      currentStats,
      this.selectMode,
      this.selectDifficulty
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getGameStats: stats => {
      dispatch(getGameStatsSuccess(stats));
    }
  };
};

const mapStateToProps = state => {
  return {
    stats: state.game.stats
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatsProvider);
