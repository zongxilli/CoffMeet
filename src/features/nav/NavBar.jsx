// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faReact,
	faChrome,
	faHornbill,
	faScribd,
} from '@fortawesome/free-brands-svg-icons';

// Dependencies
import React, { useState } from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { NavLink, useHistory } from 'react-router-dom';
import SignedOutMenu from './SignedOutMenu';
import SignedInMenu from './SignedInMenu';

export default function NavBar({ setFormOpen }) {
	const history = useHistory();
	const [authenticated, setAuthenticated] = useState(false);

	function signOutHandler() {
		setAuthenticated(false);
		history.push('/')
	}

	return (
		<Menu inverted fixed="top">
			<Container>
				<Menu.Item as={NavLink} exact to="/" header>
					<FontAwesomeIcon
						icon={faHornbill}
						size="2x"
						color="white"
						opacity="1"
						style={{ marginRight: '0.5rem' }}
						spin
					/>
					CoffMeet
				</Menu.Item>
				<Menu.Item as={NavLink} to="/events" name="Events" />
				<Menu.Item as={NavLink} to="/sandbox" name="Sandbox" />
				{authenticated && (
					<Menu.Item as={NavLink} to="/createEvent">
						<Button positive inverted content="Create Event" />
					</Menu.Item>
				)}
				{authenticated ? (
					<SignedInMenu signOut={signOutHandler} />
				) : (
					<SignedOutMenu setAuthenticated={setAuthenticated} />
				)}
			</Container>
		</Menu>
	);
}
