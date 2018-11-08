import React from "react";
import { Columns, Column, Box, Typography } from '../../../components/UI';

const NextQuestion = props => {
  return (
    <Columns mobile tablet desktop centered>
      <Column mobile={10} tablet={6} desktop={6}>
        <Box>
          <Typography type="title" size={3} centered>
            ¡Respuesta {props.wrong ? 'Incorrecta' : 'Correcta'}!
          </Typography>
          {props.wrong && (
            <Typography type="subtitle" size={5} centered>
              {props.children}
            </Typography>
          )}
          <button
            type="button"
            className="button is-info is-large is-fullwidth"
            onClick={props.goToNextQuestion}>
            Siguiente Pregunta
          </button>
        </Box>
      </Column>
    </Columns>
  );
};

export default NextQuestion;
