import React from 'react';
import cuid from 'cuid';
import { Button, Header, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent, updateEvent } from '../eventAction';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextInputComponent from '../../../app/common/form/TextInputComponent';
import TextAreaComponent from '../../../app/common/form/TextAreaComponent';
import SelectInputComponent from '../../../app/common/form/SelectedInputComponent';
import DateInputComponent from '../../../app/common/form/DateInputComponent';
import { categoryData } from '../../../app/api/categoryOptions';

export default function EventForm({ match, history }) {
	const dispatch = useDispatch();

	const selectedEvent = useSelector((state) =>
		state.event.events.find((evt) => evt.id === match.params.id)
	);

	const initialValues = selectedEvent ?? {
		title: '',
		category: '',
		description: '',
		city: '',
		venue: '',
		date: '',
	};

	const validationSchema = Yup.object({
		title: Yup.string().required('You forget to provide TITLE :)'),
		category: Yup.string().required(
			'You forget to select CATEGORY :)'
		),
		description: Yup.string().required(
			'You forget to provide DESCRIPTION :)'
		),
		city: Yup.string().required('You forget to provide CITY :)'),
		venue: Yup.string().required('You forget to provide VENUE :)'),
		date: Yup.string().required('You forget to select DATE :)'),
	});

	return (
		<Segment clearing>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					selectedEvent
						? dispatch(updateEvent({ ...selectedEvent, ...values }))
						: dispatch(
								createEvent({
									...values,
									id: cuid(),
									hostedBy: 'Kenny',
									attendees: [],
									hostPhotoURL: 'assets/user.png',
								})
						  );
					history.push('/events');
				}}
			>
				{({ isSubmitting, dirty, isValid }) => (
					<Form className='ui form'>
						<Header sub color='teal' content='Event Details' />

						<TextInputComponent
							name='title'
							placeholder='Event title'
						/>
						<SelectInputComponent
							name='category'
							placeholder='Category'
							options={categoryData}
						/>
						<TextAreaComponent
							name='description'
							placeholder='Description'
							rows={5}
						/>
						<Header
							sub
							color='teal'
							content='Event Location Details'
						/>
						<TextInputComponent name='city' placeholder='City' />
						<TextInputComponent name='venue' placeholder='Venue' />
						<DateInputComponent
							name='date'
							placeholderText='Event date'
							timeFormat='HH:mm'
							showTimeSelect
							timeCaption='time'
							dateFormat='MMMM d, yyyy h:mm a'
						/>

						<Button
							loading={isSubmitting}
							disabled={!isValid || !dirty || isSubmitting}
							type='submit'
							floated='right'
							positive
							content='Submit'
						/>
						<Button
							disabled={isSubmitting}
							as={Link}
							to='/events'
							type='submit'
							floated='right'
							content='Cancel'
						/>
					</Form>
				)}
			</Formik>
		</Segment>
	);
}
