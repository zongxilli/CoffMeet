import { Form, Formik } from 'formik';
import React from 'react';
import TextInputComponent from '../../../app/common/form/TextInputComponent';
import TextAreaComponent from '../../../app/common/form/TextAreaComponent';
import { Button } from 'semantic-ui-react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { updateUserProfile } from '../../../app/firestore/firestoreService';

export default function ProfileForm({ profile, setEditMode }) {
	return (
		<Formik
			initialValues={{
				displayName: profile.displayName,
				description: profile.description || '',
			}}
			validationSchema={Yup.object({
				displayName: Yup.string().required(),
			})}
			onSubmit={async (values, { setSubmitting }) => {
				try {
					await updateUserProfile(values);
					setEditMode(false);
				} catch (err) {
					toast.error(err.message);
				} finally {
					setSubmitting(false);
				}
			}}
		>
			{({ isSubmitting, isValid, dirty }) => (
				<Form className='ui form'>
					<TextInputComponent name='displayName' placeholder='Display Name' />
					<TextAreaComponent name='description' placeholder='Description' />
					<Button
						loading={isSubmitting}
						disabled={isSubmitting || !isValid || !dirty}
						floated='right'
						type='submit'
						size='large'
						positive
						content='Update profile'
					/>
				</Form>
			)}
		</Formik>
	);
}
