import React from 'react';

import './form-title.styles.scss';

const FormTitle = ({ isSignIn }) => {
	return isSignIn ? (
		<div className="form-title">
			<h2>I already have an account</h2>
			<span>Sign in with your email and password</span>
		</div>
	) : (
		<div className="form-title">
			<h2>I do not have an account</h2>
			<span>Sign up with your email and password</span>
		</div>
	);
};

export default FormTitle;