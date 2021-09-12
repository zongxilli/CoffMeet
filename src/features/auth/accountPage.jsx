import { Form, Formik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Header, Label, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';
import TextInputComponent from '../../app/common/form/TextInputComponent';
import { updateUserPassword } from '../../app/firestore/firebaseService';

export default function AccountPage() {
	const { currentUser } = useSelector((state) => state.auth);

	return (
		<Segment>
			<Header dividing size='large' content='Account' />

			{currentUser.providerId === 'password' && (
				<>
					<Header color='teal' sub content='Change Password' />
					<p>Use this form to change your password</p>
					<Formik
						initialValues={{ newPassword1: '', newPassword2: '' }}
						validationSchema={Yup.object({
							newPassword1: Yup.string().required(
								'You forget to put password :)'
							),
							newPassword2: Yup.string().oneOf(
								[Yup.ref('newPassword1'), null],
								'Passwords do not match :)'
							),
						})}
						onSubmit={async (values, { setSubmitting, setErrors }) => {
							try {
								await updateUserPassword(values);
							} catch (err) {
								setErrors({ auth: err.message });
							} finally {
								setSubmitting(false);
							}
						}}
					>
						{({ isValid, isSubmitting, dirty, errors }) => (
							<Form className='ui form'>
								<TextInputComponent
									name='newPassword1'
									type='password'
									placeholder='New password'
								/>
								<TextInputComponent
									name='newPassword2'
									type='password'
									placeholder='Confirm password'
								/>
								{errors.auth && (
									<Label
										basic
										color='red'
										style={{ marginButtom: '10px' }}
										content={errors.auth}
									/>
								)}
								<Button
									type='submit'
									size='large'
									positive
									content='Update password'
									loading={isSubmitting}
									disabled={!isValid || !dirty || isSubmitting}
									style={{ display: 'block' }}
								/>
							</Form>
						)}
					</Formik>
				</>
			)}

			{currentUser.providerId === 'facebook.com' && (
				<>
					<Header color='teal' sub content='Facebook account' />
					<p>Please visit Facebook to update your account</p>
					<Button
						icon='facebook'
						color='facebook'
						as={Link}
						to='https://facebook.com'
						content='Go to Facebook'
					/>
				</>
			)}

			{currentUser.providerId === 'google.com' && (
				<>
					<Header color='teal' sub content='Google account' />
					<p>Please visit Facebook to update your account</p>
					<Button
						icon='google'
						color='google plus'
						as={Link}
						to='https://google.com'
						content='Go to Google'
					/>
				</>
			)}
		</Segment>
	);
}
