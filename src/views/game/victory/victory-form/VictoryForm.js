import React from 'react';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';

const victorySchema = Yup.object().shape({
	name: Yup.string()
	.min(2, 'El nombre es muy corto')
	.max(16, 'El nombre es muy largo')
	.required('Debes introducir un nombre')
});

const VictoryForm = (props) => {
	return (
		<Formik
		initialValues={{name: ''}}
		validationSchema={victorySchema}
		onSubmit={({name}) => {
			props.submitHandler(name);
		}}
		>
			{
				({errors, touched}) => (
					<Form>
						<div className="field">
							<label className="label">Por favor, introduce tu nombre:</label>
							<div className="control">
								<Field 
								name="name" 
								type="text"
								className="input"
								placeholder="introduce tu nombre"
								disabled={props.loading}	/>
							</div>
							{errors.name && touched.name && <p className="help is-danger">{errors.name}</p>}
						</div>
						<button type="submit" className={["button", "is-info", "is-fullwidth", props.loading ? "is-loading": ""].join(' ')}
						disabled={props.loading}>
							Enviar
						</button>
					</Form>
					)
			}
			
		</Formik>
		);
}

export default VictoryForm;