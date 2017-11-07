import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';

import FormField from './FormField';
import {signinForm} from './forms';
import * as actions from '../../actions';

class Signin extends Component {
	handleFormSubmit({email, password}) {
		//need to log user in
		this.props.signinUser({email, password});
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
				{this.renderFields(signinForm)}
				<button type="submit" className="btn btn-primary">Sign in</button>
			</form>
		);
	}
}

function mapStateToProps(state) {
	return {errorMessage: state.auth.error};
}

export default reduxForm({
	form: 'signin'
})(connect(mapStateToProps, actions)(Signin));