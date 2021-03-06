import React, { useState } from 'react';
import { Button, Grid, Icon, Segment } from 'semantic-ui-react';
import { format } from 'date-fns';
import EventDetailedMap from './EventDetailedMap';

export default function EventDetailedInfo({ event }) {
	const [mapOpen, setMapOpen] = useState(true);

	return (
		<Segment.Group>
			<Segment attached='top'>
				<Grid>
					<Grid.Column width={1}>
						<Icon name='feed' size='large' color='teal' />
					</Grid.Column>
					<Grid.Column width={15}>
						<p>{event.description}</p>
					</Grid.Column>
				</Grid>
			</Segment>
			<Segment attached>
				<Grid verticalAlign='middle'>
					<Grid.Column width={1}>
						<Icon name='ticket' size='large' color='teal' />
					</Grid.Column>
					<Grid.Column width={15}>
						<span>{format(event.date, 'MMMM d, yyyy h:mm a')}</span>
					</Grid.Column>
				</Grid>
			</Segment>
			<Segment attached>
				<Grid verticalAlign='middle'>
					<Grid.Column width={1}>
						<Icon name='road' size='large' color='teal' />
					</Grid.Column>
					<Grid.Column width={11}>
						<span>{event.venue.address}</span>
					</Grid.Column>
					<Grid.Column width={4}>
						<Button
							fluid
							color='teal'
							size='tiny'
							animated='vertical'
							onClick={() => setMapOpen(!mapOpen)}
						>
							<Button.Content hidden>
								{mapOpen ? (
									<Icon name='angle double up' />
								) : (
									<Icon name='angle double down' />
								)}
							</Button.Content>
							<Button.Content visible>
								{mapOpen ? 'Hide map' : 'Open map'}
							</Button.Content>
						</Button>
					</Grid.Column>
				</Grid>
			</Segment>
			{mapOpen && <EventDetailedMap latLng={event.venue.latLng} />}
		</Segment.Group>
	);
}
