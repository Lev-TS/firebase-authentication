import React from 'react';

import './sign-up.component.scss'

import FormInput from '../form-input/form-input.component';
import FormTitle from '../form-title/form-title.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

class SignUp extends React.Component {
	constructor() {
		super();

		this.state = {
			displayName: '',
			email: '',
			password: '',
			confirmPassword: '',
			notification: {
				isVisibale: false,
				message: '',
			}
		};
	}

	handleSubmit = async (event) => {
		event.preventDefault();

		const { displayName, email, password, confirmPassword } = this.state;

        // exit this function if passwords don't match
        if (password !== confirmPassword) {
			alert("passwords don't match");
			return;
		}

		try {
            // .createUserWithEmailAndPassword() is a method that comes with auth. 
            // Use this method to create a new user. Notice how we destructure the user. 
            // This is because the method authorises an user and returns an object. That 
            // userAuth object we need for createUserProfileDocument function is saved on the 
            // "user" property of the object returened.
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            
            // save new user to the database
			await createUserProfileDocument(user, { displayName });

            // reset the form after the user is saved
			this.setState({
				displayName: '',
				email: '',
				password: '',
				confirmPassword: '',
            });
            
		} catch (error) {
			console.log(error);
		}
    };
    
    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value, })
    }

	render() {
		const { displayName, email, password, confirmPassword } = this.state;
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
					<CustomButton type="submit">SIGN UP</CustomButton>
				</form>
			</div>
		);
	}
}

export default SignUp;
