import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';

import HomePage from './pages/home/home.page';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			currentUser: null,
		};
	}

	// handling authentication
	unsubscribeFromAuth = null;
	componentDidMount() {
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			// if user is authenticated and we recieve userAuth object get latest
			// snapshot object on that user and save data that comes with that
			// object into state. Else, currentUser is userAuth object, i.e null.
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				// listen for document changes, e.g. if user data has been updated
				userRef.onSnapshot((snapShot) => {
					this.setState(
						{
							currentUser: {
								id: snapShot.id,
								// spreading out the snapshot key/value pairs
								...snapShot.data(),
							},
						}
					);
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
						path="/"
						render={(props) => (
							<HomePage
								{...props}
								currentUser={this.state.currentUser}
							/>
						)}
					/>
					<Route
						exact
						path="/signin"
						render={() =>
							this.state.currentUser ? (
								<Redirect to="/" />
							) : (
								<SignInAndSignUp />
							)
						}
					/>
				</Switch>
			</div>
		);
	}
}

export default App;
