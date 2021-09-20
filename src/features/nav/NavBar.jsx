// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact } from '@fortawesome/free-brands-svg-icons';

// Dependencies
import React from 'react';
import { Button, Container, Icon, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import SignedOutMenu from './SignedOutMenu';
import SignedInMenu from './SignedInMenu';
import { useSelector } from 'react-redux';

export default function NavBar() {
	const { authenticated } = useSelector((state) => state.auth);

	return (
		<Menu inverted fixed='top'>
			<Container>
				<Menu.Item as={NavLink} exact to='/' header>
					<FontAwesomeIcon
						icon={faReact}
						size='2x'
						color='white'
						opacity='1'
						style={{ marginRight: '0.5rem' }}
						spin
					/>
					CoffMeet
				</Menu.Item>
				<Menu.Item as={NavLink} to='/events' name='Events' />
				{/* <Menu.Item as={NavLink} to='/sandbox' name='Sandbox' /> */}
				{authenticated && (
					<Menu.Item as={NavLink} to='/createEvent'>
						<Button animated='fade' inverted color='teal'>
							<Button.Content visible>Create Event</Button.Content>
							<Button.Content hidden>
								<Icon name='coffee' />
							</Button.Content>
						</Button>
					</Menu.Item>
				)}
				{authenticated ? <SignedInMenu /> : <SignedOutMenu />}
			</Container>
		</Menu>
	);
}
