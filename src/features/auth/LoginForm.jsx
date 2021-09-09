import { Form, Formik } from 'formik';
import React from 'react';
import ModalWrapper from '../../app/common/modals/ModalWrapper';
import * as Yup from 'yup';
import TextInputComponent from '../../app/common/form/TextInputComponent';
import { Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { signInUser } from './authActions';
import { closeModal } from '../../app/common/modals/modalReducer';
import { signInWithEmail } from '../../app/firestore/firebaseService';

export default function LoginForm() {
	const dispatch = useDispatch();

	return (
		<ModalWrapper size='mini' header='Sign in to CoffMeet'>
			<Formik
				initialValues={{ email: '', password: '' }}
				validationSchema={Yup.object({
					email: Yup.string().required().email(),
					password: Yup.string().required(),
				})}
				onSubmit={async (values, { setSubmitting }) => {
					try {
						await signInWithEmail(values);
						setSubmitting(false);
						dispatch(closeModal());
					} catch (err) {
						setSubmitting(false);
						console.log(err);
					}
				}}
			>
				{({ isSubmitting, isValid, dirty }) => (
					<Form className='ui form'>
						<TextInputComponent
							name='email'
							placeholder='Email address'
						/>
						<TextInputComponent
							name='password'
							placeholder='Password'
							type='password'
						/>
						<Button
							loading={isSubmitting}
							disabled={!isValid || !dirty || isSubmitting}
							type='submit'
							fluid
							size='large'
							color='teal'
							content='Login'
						/>
					</Form>
				)}
			</Formik>
		</ModalWrapper>
	);
}
