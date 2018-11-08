import React from 'react';

const Typography = (props) => {
	return (
		<h1 className={[
				props.type,
				props.size ? `is-${props.size}` : '',
				props.centered ? 'has-text-centered' : ''
			].join(' ')}>
			{props.children}
		</h1>
		)
}

export default Typography;