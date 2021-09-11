import { Form, Formik } from 'formik';
import React from 'react';
import ModalWrapper from '../../app/common/modals/ModalWrapper';
import * as Yup from 'yup';
import TextInputComponent from '../../app/common/form/TextInputComponent';
import { Button, Divider, Label } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../app/common/modals/modalReducer';
import { signInWithEmail } from '../../app/firestore/firebaseService';
import SocialLogin from './SocialLogin';

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
				onSubmit={async (values, { setSubmitting, setErrors }) => {
					try {
						await signInWithEmail(values);
						setSubmitting(false);
						dispatch(closeModal());
					} catch (err) {
						setErrors({
							auth: 'Something wrong with username or/and password',
						});
						setSubmitting(false);
					}
				}}
			>
				{({ isSubmitting, isValid, dirty, errors }) => (
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
						{errors.auth && (
							<Label
								basic
								color='red'
								style={{ marginButtom: '10px' }}
								content={errors.auth}
							/>
						)}
						<Button
							loading={isSubmitting}
							disabled={!isValid || !dirty || isSubmitting}
							type='submit'
							fluid
							size='large'
							color='teal'
							content='Login'
						/>
						<Divider horizontal>Or</Divider>
						<SocialLogin />
					</Form>
				)}
			</Formik>
		</ModalWrapper>
	);
}
