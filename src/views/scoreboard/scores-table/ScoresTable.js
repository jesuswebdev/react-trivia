import React from "react";

const addZero = number => {
  return number < 10 ? "0" + number : number;
};

const transformDate = date => {
  const newDate = new Date(date);
  const fullDate = `${addZero(newDate.getDate())}-${addZero(
    newDate.getMonth() + 1
  )}-${newDate.getFullYear()} a las ${addZero(
    newDate.getHours()
  )}:${addZero(newDate.getMinutes())}`;
  return fullDate;
};

const ScoresTable = props => {
  if (props.children.length === 0) {
    return (
      <h1 className="subtitle is-5 has-text-centered">
        Aquí no hay nada para mostrar
      </h1>
    );
  }
  return (
    <table className="table is-bordered is-striped is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>Jugador</th>
          <th>Duración del Juego</th>
          <th>Jugado el</th>
        </tr>
      </thead>
      <tbody>
        {props.children.map((stat, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{stat.user}</td>
              <td>{stat.duration} segundos</td>
              <td>{transformDate(stat.createdAt)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ScoresTable;
