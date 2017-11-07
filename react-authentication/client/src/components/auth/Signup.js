import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';

import FormField from './FormField';
import {signupForm} from './forms';
import * as actions from '../../actions';

class Signin extends Component {
	handleFormSubmit(values) {
		this.props.signupUser(values);
	}

	renderFields(fields) {
		return fields.map(({name, label, type}) => <Field key={name} component={FormField} name={name} label={label} type={type} />);
	}

	renderAlert() {
		if (this.props.errorMessage) {
			return (
				<div className="alert alert-danger">
					<strong>Oops! </strong>{this.props.errorMessage}
				</div>
			);
		}
	}

	render() {
		const {handleSubmit} = this.props;
		
		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				{this.renderAlert()}
				{this.renderFields(signupForm)}
				<button type="submit" className="btn btn-primary">Sign in</button>
			</form>
		);
	}
}

function mapStateToProps(state) {
	return {errorMessage: state.auth.error};
}

function validate(values) {
	const errors = {};
	
	signupForm.map(key => {
		if (!values[key.name]) {
			errors[key.name] = `${key.label} is required!`;
		}
	});

	if (values.password !== values.confpwd) {
		errors.confpwd = 'Password must match!';
	}
	return errors;
}

export default reduxForm({
	form: 'signin',
	validate
})(connect(mapStateToProps, actions)(Signin));