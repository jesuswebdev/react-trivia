import { useState, useEffect } from "react";
import { http } from "../../../utils";
import { message } from "antd";

const DataProvider = ({ id, render }) => {
  const [game, setGame] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getGame = async () => {
      const loadingMessage = message.loading("Cargando...", 0);
      setLoading(true);
      setError(false);
      try {
        const { data } = await http.get("/games/" + id);
        setGame(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
        loadingMessage();
      }
    };
    getGame();
  }, []);
  return render({
    loading,
    error,
    game
  });
};

export default DataProvider;
