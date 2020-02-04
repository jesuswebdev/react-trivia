import React from "react";
import { Card, Spin } from "antd";

const QuestionTitle = ({ title, loading }) => {
  return (
    <Card style={{ marginBottom: "12px" }}>
      {loading ? (
        <div style={{ textAlign: "center" }}>
          <Spin />
        </div>
      ) : (
        <h1 style={{ fontSize: "24px", textAlign: "center" }}>{title}</h1>
      )}
    </Card>
  );
};

export default QuestionTitle;
