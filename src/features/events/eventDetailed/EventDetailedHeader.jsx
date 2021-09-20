import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Image, Item, Segment } from 'semantic-ui-react';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

import {
	addUserAttendance,
	cancelUserAttendance,
} from '../../../app/firestore/firestoreService';
import UnauthModal from '../../auth/UnauthModal';

const eventImageStyle = {
	filter: 'brightness(30%)',
};

const eventImageTextStyle = {
	position: 'absolute',
	bottom: '5%',
	left: '5%',
	width: '100%',
	height: 'auto',
	color: 'white',
};

export default function EventDetailedHeader({ event, isHost, isGoing }) {
	const { authenticated } = useSelector((state) => state.auth);

	const [modalOpen, setModalOpen] = useState(false);

	const [loading, setLoading] = useState(false);

	async function userJoinEventHandler() {
		setLoading(true);

		try {
			await addUserAttendance(event);
		} catch (err) {
			toast.error(err.message);
		} finally {
			setLoading(false);
		}
	}

	async function userLeaveEventHandler() {
		setLoading(true);

		try {
			await cancelUserAttendance(event);
		} catch (err) {
			toast.error(err.message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			{modalOpen && <UnauthModal setModalOpen={setModalOpen} />}
			<Segment.Group>
				<Segment basic attached='top' style={{ padding: '0' }}>
					<Image
						src={`/assets/categoryImages/${event.category}.jpg`}
						fluid
						style={eventImageStyle}
					/>

					<Segment basic style={eventImageTextStyle}>
						<Item.Group>
							<Item>
								<Item.Content>
									<Header
										size='huge'
										content={event.title}
										style={{ color: 'white' }}
									/>
									<p>{format(event.date, 'MMMM d, yyyy h:mm a')}</p>
									<p>
										Hosted by{' '}
										<strong>
											<Link to={`/profile/${event.hostUid}`}>
												{event.hostedBy}
											</Link>
										</strong>
									</p>
								</Item.Content>
							</Item>
						</Item.Group>
					</Segment>
				</Segment>

				<Segment attached='bottom' clearing>
					{!isHost && (
						<>
							{isGoing ? (
								<Button loading={loading} onClick={userLeaveEventHandler}>
									Cancel my place
								</Button>
							) : (
								<Button
									color='pink'
									loading={loading}
									onClick={
										authenticated
											? userJoinEventHandler
											: () => setModalOpen(true)
									}
								>
									Join this event
								</Button>
							)}
						</>
					)}

					{isHost && (
						<Button
							as={Link}
							to={`/manage/${event.id}`}
							color='teal'
							floated='left'
						>
							Manage Event
						</Button>
					)}

					<Button
						as={Link}
						to='/events'
						animated='fade'
						floated='right'
						color='orange'
					>
						<Button.Content visible>
							<Icon name='angle double left' /> Back
						</Button.Content>
						<Button.Content hidden>
							<Icon name='angle double left' />
						</Button.Content>
					</Button>
				</Segment>
			</Segment.Group>
		</>
	);
}
