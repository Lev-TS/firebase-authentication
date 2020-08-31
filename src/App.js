import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';

import HomePage from './pages/home/home.page';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Attribution from './components/attribution/attribution.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			currentUser: null,
		};
	}

	unsubscribeFromAuth = null;

	componentDidMount() {
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);
				userRef.onSnapshot((snapShot) => {
					this.setState({
						currentUser: {
							id: snapShot.id,
							...snapShot.data(),
						},
					});
				});
			} else {
				this.setState({ currentUser: userAuth });
			}
		});
	}
	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	render() {
		return (
			<div className="App">
				<Switch>
					<Route
						exact
						path="/firebase-authentication"
						render={(props) => (
							<HomePage
								{...props}
								currentUser={this.state.currentUser}
							/>
						)}
					/>
					<Route
						exact
						path="/firebase-authentication/signin"
						render={() =>
							this.state.currentUser ? (
								<Redirect to="/" />
							) : (
								<SignInAndSignUp />
							)
						}
					/>
				</Switch>
				<Attribution />
			</div>
		);
	}
}

export default App;
