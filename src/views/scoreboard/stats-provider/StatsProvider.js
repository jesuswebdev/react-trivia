import { Component } from "react";
import { http } from "../../../utils";

class StatsProvider extends Component {
  state = {
    stats: {},
    loading: false,
    error: false,
    mode: "fast",
    difficulty: "easy"
  };

  componentDidMount() {
    this.setState({ loading: true, error: false }, async () => {
      try {
        const { data } = await http.get("/games/top");
        this.setState({ loading: false, stats: data });
      } catch (error) {
        this.setState({ loading: false, error: true });
      }
    });
  }

  selectMode = mode => this.setState({ mode });

  selectDifficulty = difficulty => this.setState({ difficulty });

  render() {
    const { loading, error, mode, difficulty, stats } = this.state;
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

export default StatsProvider;
