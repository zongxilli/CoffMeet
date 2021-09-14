import { Form, Formik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import { addEventChatComment } from '../../../app/firestore/firebaseService';
import TextAreaComponent from '../../../app/common/form/TextAreaComponent';
import { Button } from 'semantic-ui-react';

export default function EventDetailedChatForm({ eventId }) {
	return (
		<Formik
			initialValues={{ comment: '' }}
			onSubmit={async (values, { setSubmitting, resetForm }) => {
				try {
					await addEventChatComment(eventId, values.comment);
					resetForm();
				} catch (err) {
					toast.error(err.message);
				} finally {
					setSubmitting(false);
				}
			}}
		>
			{({ isSubmitting }) => (
				<Form className='ui form'>
					<TextAreaComponent
						name='comment'
						placeholder='Please enter your comment'
						rows={2}
					/>
					<Button
						primary
						type='submit'
						icon='edit'
						content='Add reply'
						loading={isSubmitting}
					/>
				</Form>
			)}
		</Formik>
	);
}
