import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Divider, Header } from 'semantic-ui-react';
import { openModal } from '../../app/common/modals/modalReducer';

export default function UnauthModal({ history, setModalOpen }) {
	const dispatch = useDispatch();
	const { prevLocation } = useSelector((state) => state.auth);

	const [open, setOpen] = useState(true);

	function closeHandler() {
		if (!history) {
			setOpen(false);
			setModalOpen(false);
			return;
		}

		if (history && prevLocation) {
			history.push(prevLocation.pathname);
		} else {
			history.push('/events');
		}

		setOpen(false);
	}

	function openLoginModalHandler(modalType) {
		dispatch(openModal({ modalType }));
		setOpen(false);
		setModalOpen(false);
	}

	return (
		<Modal open={open} size='mini' onClose={closeHandler}>
			<Modal.Header content='You need to be logged in to do this :)' />
			<Modal.Content>
				<Button.Group widths={4}>
					<Button
						fluid
						color='purple'
						content='Login'
						onClick={() => openLoginModalHandler('LoginForm')}
					/>
					<Button.Or />
					<Button
						fluid
						color='teal'
						content='Register'
						onClick={() => openLoginModalHandler('RegisterForm')}
					/>
				</Button.Group>
				<Divider />
				<div style={{ textAlign: 'center' }}>
					<Header as='h4' content='or click cancel to continue as a guest' />
					<Button content='Cancel' onClick={closeHandler} />
				</div>
			</Modal.Content>
		</Modal>
	);
}
