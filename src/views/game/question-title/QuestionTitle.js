import React from "react";
import { Card } from "antd";

const QuestionTitle = ({ title }) => {
  return (
    <Card style={{ marginBottom: "12px" }}>
      <h1 style={{ fontSize: "24px", textAlign: "center" }}>{title}</h1>
    </Card>
  );
};

export default QuestionTitle;
