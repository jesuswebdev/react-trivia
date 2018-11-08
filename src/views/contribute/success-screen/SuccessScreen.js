import React from 'react';
import { Link } from 'react-router-dom';
import { Columns, Column, Box, Typography } from '../../../components/UI';

const SuccessScreen = ({reset}) => {
	return (
		<Columns mobile tablet desktop centered>
      <Column mobile={10} tablet={6} desktop={6}>
        <Box>
          <Typography type="title" size={3} centered>
            ¡Gracias por tu contribución!
          </Typography>
          <Typography type="subtitle" size={3} centered>
            Ahora tu pregunta será evaluada por el administrador
          </Typography>
          
          <button
          	style={{marginBottom: '12px'}}
            className="button is-info is-large is-fullwidth"
            onClick={reset}>
            Proponer otra pregunta
          </button>
          <Link
          	to="/"
            className="button is-info is-large is-fullwidth"
            onClick={reset}>
            Ir al menú principal
          </Link>
        </Box>
      </Column>
    </Columns>
   )
};

export default SuccessScreen;