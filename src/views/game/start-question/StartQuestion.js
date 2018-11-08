import React from "react";
import { Columns, Column, Box, Typography } from '../../../components/UI';

const StartQuestion = props => {
  return (
    <Columns mobile tablet desktop centered>
      <Column mobile={10} tablet={6} desktop={6} >
        <Box>
          <Typography type="title" size={3} centered>
            Pregunta {props.currentQuestion} de {props.questionCount}
          </Typography>
          <Typography type="subtitle" size={5} centered>
            Categoria: {props.category}
          </Typography>
          <button
            type="button"
            className="button is-info is-large is-fullwidth"
            onClick={props.startQuestion}>
            Comenzar
          </button>
        </Box>
      </Column>
    </Columns>
  );
};

export default StartQuestion;
