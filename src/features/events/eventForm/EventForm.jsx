/* global google */
import React, { useEffect, useState } from 'react';
import { Button, Confirm, Header, Segment } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedEvent, listenToSelectedEvent } from '../eventActions';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextInputComponent from '../../../app/common/form/TextInputComponent';
import TextAreaComponent from '../../../app/common/form/TextAreaComponent';
import SelectInputComponent from '../../../app/common/form/SelectedInputComponent';
import DateInputComponent from '../../../app/common/form/DateInputComponent';
import { categoryData } from '../../../app/api/categoryOptions';
import PlaceInputComponent from '../../../app/common/form/PlaceInputComponent';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import {
	addEventToFirestore,
	cancelEventToggle,
	listenToEventFromFirestore,
	updateEventInFirestore,
} from '../../../app/firestore/firestoreService';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { toast } from 'react-toastify';

export default function EventForm({ match, history, location }) {
	const dispatch = useDispatch();

	const [loadingCancel, setLoadingCancel] = useState(false);
	const [confirmOpen, setConfirmOpen] = useState(false);

	const { selectedEvent } = useSelector((state) => state.event);
	const { loading, error } = useSelector((state) => state.async);

	useEffect(() => {
		if (location.pathname !== '/createEvent') return;

		dispatch(clearSelectedEvent());
	}, [dispatch, location.pathname]);

	const initialValues = selectedEvent ?? {
		title: '',
		category: '',
		description: '',
		city: {
			address: '',
			latLng: null,
		},
		venue: {
			address: '',
			latLng: null,
		},
		date: '',
	};

	const validationSchema = Yup.object({
		title: Yup.string().required('You forget to provide TITLE :)'),
		category: Yup.string().required('You forget to select CATEGORY :)'),
		description: Yup.string().required('You forget to provide DESCRIPTION :)'),
		city: Yup.object().shape({
			address: Yup.string().required('You forget to provide CITY :)'),
		}),
		venue: Yup.object().shape({
			address: Yup.string().required('You forget to provide VENUE :)'),
		}),
		date: Yup.string().required('You forget to select DATE :)'),
	});

	async function handleCancelToggle(event) {
		setConfirmOpen(false);
		setLoadingCancel(true);

		try {
			await cancelEventToggle(event);
			setLoadingCancel(false);
		} catch (err) {
			setLoadingCancel(false);
			toast.error(err.message);
		}
	}

	useFirestoreDoc({
		shouldExecute:
			match.params.id !== selectedEvent?.id &&
			location.pathname !== '/createEvent',
		query: () => listenToEventFromFirestore(match.params.id),
		data: (event) => dispatch(listenToSelectedEvent(event)),
		deps: [dispatch, match.params.id],
	});

	if (loading) return <LoadingComponent content='Loading event...' />;

	if (error) return <Redirect to='/error' />;

	return (
		<Segment clearing>
			<Formik
				enableReinitialize
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={async (values, { setSubmitting }) => {
					try {
						selectedEvent
							? await updateEventInFirestore(values)
							: await addEventToFirestore(values);
						setSubmitting(false);
						history.push('/events');
					} catch (err) {
						toast.error(err.message);
						setSubmitting(false);
					}
				}}
			>
				{({ isSubmitting, dirty, isValid, values }) => (
					<Form className='ui form'>
						<Header sub color='teal' content='Event Details' />

						<TextInputComponent name='title' placeholder='Event title' />
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
						<Header sub color='teal' content='Event Location Details' />
						<PlaceInputComponent name='city' placeholder='City' />
						<PlaceInputComponent
							name='venue'
							disabled={!values.city.latLng}
							placeholder='Venue'
							options={{
								location: new google.maps.LatLng(values.city.latLng),
								radius: 1000,
								types: ['establishment'],
							}}
						/>
						<DateInputComponent
							name='date'
							placeholderText='Event date'
							timeFormat='HH:mm'
							showTimeSelect
							timeCaption='time'
							dateFormat='MMMM d, yyyy h:mm a'
							autoComplete='off'
						/>
						{selectedEvent && (
							<Button
								type='button'
								floated='left'
								color={selectedEvent.isCancelled ? 'green' : 'red'}
								content={
									selectedEvent.isCancelled
										? 'Reactivate event'
										: 'Cancel Event'
								}
								loading={loadingCancel}
								onClick={() => setConfirmOpen(true)}
							/>
						)}
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
							content='Back'
						/>
					</Form>
				)}
			</Formik>
			<Confirm
				content={
					selectedEvent?.isCancelled
						? 'This will reactivate the event - are you sure?'
						: 'This will cancel the event - are you sure?'
				}
				open={confirmOpen}
				onCancel={() => setConfirmOpen(false)}
				onConfirm={() => handleCancelToggle(selectedEvent)}
			/>
		</Segment>
	);
}
