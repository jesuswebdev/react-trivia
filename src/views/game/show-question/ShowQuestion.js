import React from "react";
import Timer from "../../../components/timer/Timer";
import QuestionOptions from "../question-options/QuestionOptions";
import { Columns, Column, Box, Typography } from "../../../components/UI";

const ShowQuestion = props => {
  return (
    <Columns mobile tablet desktop centered>
      <Column mobile={10} tablet={10} desktop={10}>
        <Typography type="subtitle" size={2} centered>
          <Timer />
        </Typography>
        <Box>
          <Typography type="subtitle" size={4} centered>
            {props.question.title}
          </Typography>
        </Box>

        <QuestionOptions
          options={props.question.options}
          selectOptionHandler={props.selectOptionHandler}
        />
      </Column>
    </Columns>
  );
};

export default ShowQuestion;
