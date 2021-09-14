import { Field, Form, Formik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import { addEventChatComment } from '../../../app/firestore/firebaseService';
import TextAreaComponent from '../../../app/common/form/TextAreaComponent';
import { Button, Loader } from 'semantic-ui-react';

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
			{({ isSubmitting, handleSubmit }) => (
				<Form className='ui form'>
					<Field name='comment'>
						{({ field }) => (
							<div style={{ position: 'relative' }}>
								<Loader active={isSubmitting} />
								<textarea
									{...field}
									rows='3'
									placeholder=' Put your comment here ( ENTER to submit ,  SHIFT+ENTER for new line )'
									onKeyPress={(e) => {
										if (e.key === 'Enter' && e.shiftKey) {
											return;
										}
										if (e.key === 'Enter' && !e.shiftKey) {
											handleSubmit();
										}
									}}
								></textarea>
							</div>
						)}
					</Field>
				</Form>
			)}
		</Formik>
	);
}
