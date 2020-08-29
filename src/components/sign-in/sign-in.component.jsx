import React from 'react';

import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.component';
import FormTitle from '../form-title/form-title.component'
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			alert: '',
		};
	}

	handleSubmit = async (event) => {
		event.preventDefault();
		const { email, password } = this.state;

		try {
			await auth.signInWithEmailAndPassword(email, password);
			this.setState({ email: '', password: '' });
		} catch (error) {
			console.log(error);
			this.setState({ alert: 'Invalid Login or password.' });
		}
	};

	handleChange = (event) => {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	};

	render() {
		const alert = this.state.alert;

		return (
			<div className="sign-in">
				<FormTitle isSignIn/>

				<form onSubmit={this.handleSubmit}>
					<FormInput
						name="email"
						type="email"
						value={this.state.email}
						handleChange={this.handleChange}
						label="Email"
						required
					/>

					<FormInput
						name="password"
						type="password"
						value={this.state.password}
						handleChange={this.handleChange}
						label="Password"
						required
					/>
					<div
						className="alert"
						style={{ display: alert ? 'block' : 'none' }}
					>
						{alert}
					</div>
					<div className="buttons">
						<CustomButton type="submit" value="Submit Form">
							Sign In
						</CustomButton>
						<CustomButton
							type="button"
							onClick={signInWithGoogle}
							isGoogleSignIn
						>
							Sign in with Google
						</CustomButton>
					</div>
				</form>
			</div>
		);
	}
}

export default SignIn;
