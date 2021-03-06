import { useEffect, useState } from "react";
import { http } from "../../../utils";
import { message } from "antd";

const StatsProvider = ({ render }) => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getStats = async () => {
      const loadingMessage = message.loading("Cargando...", 0);
      setLoading(true);
      setError(false);
      try {
        const { data } = await http.get("/games/top");
        setStats(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
        loadingMessage();
      }
    };
    getStats();
  }, []);
  return render({
    loading,
    error,
    stats
  });
};

export default StatsProvider;
