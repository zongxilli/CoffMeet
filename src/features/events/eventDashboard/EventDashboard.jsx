import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import EventForm from '../eventForm/EventForm';
import EventList from './EventList';
import { sampleData } from '../../../app/api/sampleData';

export default function EventDashboard({
	formOpen,
	setFormOpen,
	selectEvent,
	selectedEvent,
}) {
	const [events, setEvents] = useState(sampleData);

	function createEventHandler(event) {
		setEvents([...events, event]);
	}

	function updateEventHandler(updatedEvent) {
		setEvents(
			events.map((event) =>
				event.id === updatedEvent.id ? updatedEvent : event
			)
		);
		selectEvent(null);
	}

	function deleteEventHandler(eventId) {
		setEvents(events.filter((event) => event.id !== eventId));
	}

	return (
		<Grid>
			<Grid.Column width={10}>
				<EventList
					events={events}
					selectEvent={selectEvent}
					deleteEvent={deleteEventHandler}
				/>
			</Grid.Column>
			<Grid.Column width={6}>
				{formOpen && (
					<EventForm
						key={selectedEvent ? selectedEvent.id : null}
						setFormOpen={setFormOpen}
						setEvents={setEvents}
						createEvent={createEventHandler}
						selectedEvent={selectedEvent}
						updateEvent={updateEventHandler}
					/>
				)}
			</Grid.Column>
		</Grid>
	);
}
