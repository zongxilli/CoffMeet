import { Form, Formik } from 'formik';
import React from 'react';
import ModalWrapper from '../../app/common/modals/ModalWrapper';
import * as Yup from 'yup';
import TextInputComponent from '../../app/common/form/TextInputComponent';
import { Button, Label } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../app/common/modals/modalReducer';
import { registerInFirebase } from '../../app/firestore/firebaseService';

export default function RegisterForm() {
	const dispatch = useDispatch();

	return (
		<ModalWrapper size='mini' header='Register to CoffMeet'>
			<Formik
				initialValues={{ displayName: '', email: '', password: '' }}
				validationSchema={Yup.object({
					displayName: Yup.string().required(),
					email: Yup.string().required().email(),
					password: Yup.string().required(),
				})}
				onSubmit={async (values, { setSubmitting, setErrors }) => {
					try {
						await registerInFirebase(values);
						setSubmitting(false);
						dispatch(closeModal());
					} catch (err) {
						setErrors({ auth: err.message });
						setSubmitting(false);
					}
				}}
			>
				{({ isSubmitting, isValid, dirty, errors }) => (
					<Form className='ui form'>
						<TextInputComponent
							name='displayName'
							placeholder='DisplayName'
						/>
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
								style={{ marginButtom: '10' }}
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
							content='Register'
						/>
					</Form>
				)}
			</Formik>
		</ModalWrapper>
	);
}
