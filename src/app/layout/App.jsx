import React from 'react';
import { Route, useLocation } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';

import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import EventDetailedPage from '../../features/events/eventDetailed/EventDetailedPage';
import EventForm from '../../features/events/eventForm/EventForm';
import HomePage from '../../features/home/HomePage';
import NavBar from '../../features/nav/NavBar';
import Sandbox from '../../features/sandbox/Sandbox';
import ModalManager from '../common/modals/ModalManager';
import ErrorComponent from '../common/errors/ErrorComponent';
import AccountPage from '../../features/auth/accountPage';
import LoadingComponent from './LoadingComponent';

export default function App() {
	const { key } = useLocation();
	const { initialized } = useSelector((state) => state.async);

	if (!initialized) return <LoadingComponent content='Loading app...' />;

	return (
		<>
			<ModalManager />
			<ToastContainer position='top-right' theme='dark' />
			<Route exact path='/' component={HomePage} />
			<Route
				path={'/(.+)'}
				render={() => (
					<>
						<NavBar />
						<Container className='main'>
							<Route exact path='/events' component={EventDashboard} />
							<Route exact path='/sandbox' component={Sandbox} />
							<Route path='/events/:id' component={EventDetailedPage} />
							<Route
								path={['/createEvent', '/manage/:id']}
								component={EventForm}
								key={key}
							/>
							<Route path='/account' component={AccountPage} />
							<Route path='/error' component={ErrorComponent} />
						</Container>
					</>
				)}
			/>
		</>
	);
}
