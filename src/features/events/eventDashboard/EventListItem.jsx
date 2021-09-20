import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon, Item, Label, List, Segment } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';
import { format } from 'date-fns';

import { deleteEventInFirestore } from '../../../app/firestore/firestoreService';

export default function EventListItem({ event }) {
	const dispatch = useDispatch();

	const { authenticated, currentUser } = useSelector((state) => state.auth);

	return (
		<Segment.Group>
			<Segment>
				<Item.Group>
					<Item>
						<Item.Image size='tiny' circular src={event.hostPhotoURL} />
						<Item.Content>
							<Item.Header content={event.title} />
							<Item.Description>
								Hosted By{' '}
								<Link to={`/profile/${event.hostUid}`}> {event.hostedBy} </Link>
							</Item.Description>
							{event.isCancelled && (
								<Label
									style={{ top: '-40px' }}
									ribbon='right'
									color='red'
									content='This event has been cancelled'
								/>
							)}
						</Item.Content>
					</Item>
				</Item.Group>
			</Segment>
			<Segment>
				<span>
					<Icon name='clock' /> {format(event.date, 'MMMM d, yyyy h:mm a')}
					<Icon name='marker' /> {event.venue.address}
				</span>
			</Segment>
			<Segment secondary>
				<List horizontal>
					{event.attendees.map((attendee) => (
						<EventListAttendee attendee={attendee} key={attendee.id} />
					))}
				</List>
			</Segment>
			<Segment clearing>
				<div>{event.description}</div>
				<Button
					floated='right'
					animated='vertical'
					disabled={!authenticated || currentUser.uid !== event.hostUid}
					onClick={() => {
						deleteEventInFirestore(event.id);

						//! Me Add
						dispatch({ type: 'DELETE_EVENT', payload: event.id });
						//! -----------------------------------------------------------
					}}
				>
					<Button.Content visible>Delete</Button.Content>
					<Button.Content hidden>
						<Icon name='delete' />
					</Button.Content>
				</Button>
				<Button
					floated='right'
					animated='fade'
					as={Link}
					to={`/events/${event.id}`}
					color='pink'
				>
					<Button.Content visible>
						View <Icon name='angle double right' />
					</Button.Content>
					<Button.Content hidden>
						<Icon name='angle double right' />
					</Button.Content>
				</Button>
			</Segment>
		</Segment.Group>
	);
}
