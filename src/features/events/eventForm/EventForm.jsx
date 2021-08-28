import React, { useState } from 'react';
import cuid from 'cuid';
import { Button, Form, Header, Segment } from 'semantic-ui-react';

export default function EventForm({
	setFormOpen,
	setEvents,
	createEvent,
	selectedEvent,
	updateEvent,
}) {
	const initialValues = selectedEvent ?? {
		title: '',
		category: '',
		description: '',
		city: '',
		venue: '',
		date: '',
	};

	const [values, setValues] = useState(initialValues);

	function onSubmitHandler() {
		selectedEvent
			? updateEvent({ ...selectedEvent, ...values })
			: createEvent({
					...values,
					id: cuid(),
					hostedBy: 'Kenny',
					attendees: [],
					hostPhotoURL: 'assets/user.png',
			  });
		setFormOpen(false);
	}

	function onChangeHandler(e) {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	}

	return (
		<Segment clearing>
			<Header content={selectedEvent ? 'Edit the event' : 'Create new event'} />
			<Form onSubmit={onSubmitHandler}>
				<Form.Field>
					<input
						type="text"
						placeholder="Event"
						name="title"
						value={values.title}
						onChange={(e) => onChangeHandler(e)}
					/>
				</Form.Field>
				<Form.Field>
					<input
						type="text"
						placeholder="Category"
						name="category"
						value={values.category}
						onChange={(e) => onChangeHandler(e)}
					/>
				</Form.Field>
				<Form.Field>
					<input
						type="text"
						placeholder="Description"
						name="description"
						value={values.description}
						onChange={(e) => onChangeHandler(e)}
					/>
				</Form.Field>
				<Form.Field>
					<input
						type="text"
						placeholder="City"
						name="city"
						value={values.city}
						onChange={(e) => onChangeHandler(e)}
					/>
				</Form.Field>
				<Form.Field>
					<input
						type="text"
						placeholder="Venue"
						name="venue"
						value={values.venue}
						onChange={(e) => onChangeHandler(e)}
					/>
				</Form.Field>
				<Form.Field>
					<input
						type="date"
						placeholder="Date"
						name="date"
						value={values.date}
						onChange={(e) => onChangeHandler(e)}
					/>
				</Form.Field>
				<Button type="submit" floated="right" positive content="Submit" />
				<Button
					type="submit"
					floated="right"
					content="Cancel"
					onClick={() => setFormOpen(false)}
				/>
			</Form>
		</Segment>
	);
}
