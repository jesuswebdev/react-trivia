import React from 'react';
import { Link } from 'react-router-dom';
import Aux from '../../../components/aux/Aux';
import VictoryForm from './victory-form/VictoryForm';

const Victory = (props) => {
	return (
		<div className="columns is-mobile is-tablet is-desktop is-centered">
      <div className="column is-10-mobile is-6-tablet is-6-desktop">
        <div className="box">
          <h1 className="title is-2 has-text-centered">
            ¡Enhorabuena!
          </h1>            
          <h1 className="subtitle is-4 has-text-centered">
              Lograste Completar el Reto
          </h1>
          {props.error && <div class="notification is-danger">
          {props.errorMessage}
          </div>
      		}

      		{
      			!props.gameSaved && <VictoryForm submitHandler={props.submitHandler} loading={props.loading} />
      		}
      		{
      			props.gameSaved && <Aux>
      				<div className="notification is-success has-text-centered">
      					El juego se guardó con éxito
      				</div>
	      			<Link
	      			to="/nuevo"
	      			className="button is-info is-large is-fullwidth is-rounded"
	      			style={{ marginBottom: "15px", marginTop: "50px" }}>
	      				Jugar otra vez
			        </Link>
			        <Link
			        to="/"
			        className="button is-info is-large is-fullwidth is-rounded">
			        	Ir al menú principal
			        </Link>
		        </Aux>
      		}
          </div>
         </div>
         </div>
          
		);
}

export default Victory;