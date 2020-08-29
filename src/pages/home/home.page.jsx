import React from 'react';
import { withRouter } from 'react-router-dom';

import './home.styles.scss';

import { auth } from '../../firebase/firebase.utils';

const HomePage = ({ currentUser, history }) => (
	<div className="home-page">
		<h1>{currentUser ? 'AUTHENTICATED' : 'START AUTHENTICATION'}</h1>
		{currentUser ? (
			<button className="sign-out-button" onClick={() => auth.signOut()}>
				SIGN OUT
			</button>
		) : (
			<button
				className="sign-in-button"
				onClick={() => history.push('/signin')}
			>
				&#10095;
			</button>
		)}
	</div>
);

export default withRouter(HomePage);
