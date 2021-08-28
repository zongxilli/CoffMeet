import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faReact,
	faChrome,
	faHornbill,
	faScribd,
} from '@fortawesome/free-brands-svg-icons';

export default function NavBar({ setFormOpen }) {
	return (
		<Menu inverted fixed="top">
			<Container>
				<Menu.Item header>
					{/* <img src="/assets/logo.png" alt="logo" /> */}
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
				<Menu.Item name="Events" />
				<Menu.Item>
					<Button
						positive
						inverted
						content="Create Event"
						onClick={() => setFormOpen(true)}
					/>
				</Menu.Item>
				<Menu.Item position="right">
					<Button basic inverted content="Login" />
					<Button
						basic
						inverted
						content="Register"
						style={{ marginLeft: '0.5em' }}
					/>
				</Menu.Item>
			</Container>
		</Menu>
	);
}
