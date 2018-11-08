import React from 'react';

const Column = (props) => {
	return (
		<div className={`column ${[
				props.mobile ? `is-${props.mobile}-mobile` : '',
				props.tablet ? `is-${props.tablet}-tablet` : '',
				props.desktop ? `is-${props.desktop}-desktop` : '',
				props.size ? `is-${props.size}` : ''
			].join(' ')}`}>
			{props.children}
		</div>
		)
}

export default Column;