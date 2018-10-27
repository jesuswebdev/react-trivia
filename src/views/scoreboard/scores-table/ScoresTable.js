import React from "react";

const ScoresTable = props => {
  if (props.children.length === 0) {
    return <div>Aquí no hay nada</div>;
  }
  return (
    <table className="table is-bordered is-striped is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>Usuario</th>
          <th>Duración del Juego</th>
          <th>Fecha del Juego</th>
        </tr>
      </thead>
      <tbody>
        {props.children.map((stat, index) => {
          return (
            <tr>
              <td>{index + 1}</td>
              <td>{stat.user.name}</td>
              <td>{stat.duration} segundos</td>
              <td>{stat.createdAt}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ScoresTable;
