import React from 'react';

import './sign-up.component.scss';

import FormInput from '../form-input/form-input.component';
import FormTitle from '../form-title/form-title.component';
import CustomButton from '../custom-button/custom-button.component';
import PasswordInfo from '../password-info/password-info.component';

import { validatePassword } from './sign-up.utils';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

class SignUp extends React.Component {
	constructor() {
		super();

		this.state = {
			displayName: '',
			email: '',
			password: '',
			confirmPassword: '',
			alert: '',
			isInvalidPassword: false,
		};
	}

	handleSubmit = async (event) => {
		event.preventDefault();

		const { displayName, email, password, confirmPassword } = this.state;

		if (password !== confirmPassword) {
			this.setState({ alert: "Passwords don't match." });
			return;
		}

		if (validatePassword(password) < 3) {
			this.setState({
				alert:
					"We've detected that the password you've entered may not be secure. Please create a new one.",
				isInvalidPassword: true,
			});
			return;
		}

		try {
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);

			await createUserProfileDocument(user, { displayName });

			this.setState({
				displayName: '',
				email: '',
				password: '',
				confirmPassword: '',
			});
		} catch (error) {
			this.setState({ alert: error.message });
		}
	};

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	componentWillUnmount() {
		this.setState({
			displayName: '',
			email: '',
			password: '',
			confirmPassword: '',
			alert: '',
			isInvalidPassword: false,
		});
	}

	render() {
		const {
			displayName,
			email,
			password,
			confirmPassword,
			isInvalidPassword,
		} = this.state;
		return (
			<div className="sign-up">
				<FormTitle />
				<form className="sign-up-form" onSubmit={this.handleSubmit}>
					<FormInput
						type="text"
						name="displayName"
						value={displayName}
						onChange={this.handleChange}
						label="Full Name"
						required
					/>
					<FormInput
						type="email"
						name="email"
						value={email}
						onChange={this.handleChange}
						label="Email"
						required
					/>
					<FormInput
						type="password"
						name="password"
						value={password}
						onChange={this.handleChange}
						label="Password"
						required
					/>
					<FormInput
						type="password"
						name="confirmPassword"
						value={confirmPassword}
						onChange={this.handleChange}
						label="Confirm Password"
						required
					/>
					<div
						className="alert"
						style={{ display: this.state.alert ? 'flex' : 'none' }}
					>
						<div>{this.state.alert}</div>
						<PasswordInfo isInvalidPassword={isInvalidPassword} />
					</div>
					<CustomButton type="submit">SIGN UP</CustomButton>
				</form>
			</div>
		);
	}
}

export default SignUp;
