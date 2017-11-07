import React from 'react';

export default ({input, label, type, meta: {error, touched}}) => {
	return (
		<fieldset className="form-group">
			<label htmlFor={input.name}>{label}</label>
			<input {...input} type={type} className="form-control" />
			<div className="text-danger">
				{touched && error}
			</div>
		</fieldset>
	);
}