import React from 'react';

import './password-info.styles.scss';

class PasswordInfo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isHidden: true,
		};
	}

	onMouseEnter = () => {
		this.setState({ isHidden: false });
	};

	onMouseLeave = () => {
		this.setState({ isHidden: true });
	};

	render() {
		return (
			<div
				className="password-info"
				onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                style={{ display: this.props.isInvalidPassword ? 'block' : 'none' }}
			>
				<div className="info-toggler">&#9432;</div>
				<div
					className="info-container"
					style={{ display: this.state.isHidden ? 'none' : 'block' }}
				>
					<p>
						Your password is too weak, please make sure you:
					</p>
					<ul>
						<li>Use at least 6 characters</li>
						<li>Use a mix of upper and lower case characters</li>
						<li>Use at least one number</li>
						<li>
							Use at least 1 special character like “.”, “&”, or
							“*”
						</li>
						<li>
							Do not use common words or simple passwords like
							“password”, “qwerty”, or “123456”
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

export default PasswordInfo;
