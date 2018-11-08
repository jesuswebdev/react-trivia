import React from 'react';

const Columns = (props) => {
	return (
		<div className={`columns ${[
				props.mobile ? 'is-mobile' : '',
				props.tablet ? 'is-tablet' : '',
				props.desktop ? 'is-desktop' : '',
				props.multiline ? 'is-multiline' : '',
				props.centered ? 'is-centered' : ''
			]
			.join(' ')}`}>
			{props.children}
		</div>
		)
}

export default Columns;