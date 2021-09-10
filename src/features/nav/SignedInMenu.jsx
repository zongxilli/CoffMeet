import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Dropdown, Image, Menu } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { signOutFirebase } from '../../app/firestore/firebaseService';

export default function SignedInMenu() {
	const { currentUser } = useSelector((state) => state.auth);
	const history = useHistory();

	async function signOutHandler() {
		try {
			await signOutFirebase();
			history.push('/');
		} catch (err) {
			toast.error(err.message);
		}
	}

	return (
		<Menu.Item position='right'>
			<Image
				avatar
				spaced='right'
				src={currentUser.photoURL || '/assets/user.png'}
			/>
			<Dropdown pointing='top left' text='currentUser.email'>
				<Dropdown.Menu>
					<Dropdown.Item
						as={Link}
						to='/createEvent'
						text='Create Event'
						icon='plus'
					/>
					<Dropdown.Item text='My profile' icon='user' />
					<Dropdown.Item
						text='Sign out'
						icon='power'
						onClick={signOutHandler}
					/>
				</Dropdown.Menu>
			</Dropdown>
		</Menu.Item>
	);
}
