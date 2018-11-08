import React from 'react';
import { Columns, Column } from '../../../components/UI';

const QuestionOptions = ({options, selectOptionHandler}) => {

	const optionsButtons = options.map(q => {
    return (
      <Column size={6} key={q.option_id}>
        <button
          type="button"
          className="button is-fullwidth is-large is-rounded is-info"
          id={q.option_id}
          onClick={event => selectOptionHandler(event)}>
          {q.text}
        </button>
      </Column>
    );
  });

	return (
		<Columns multiline>
      {optionsButtons}
    </Columns>
		);
}

export default QuestionOptions;