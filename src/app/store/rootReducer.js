import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authReducer from '../../features/auth/authReducer';
import eventReducer from '../../features/events/eventReducer';
import profileReducer from '../../features/profiles/profileReducer';
import testReducer from '../../features/sandbox/testReducer';
import asyncReducer from '../async/asyncReducer';
import modalReducer from '../common/modals/modalReducer';

const rootReducer = (history) =>
	combineReducers({
		router: connectRouter(history),
		test: testReducer,
		event: eventReducer,
		modals: modalReducer,
		auth: authReducer,
		async: asyncReducer,
		profile: profileReducer,
	});

export default rootReducer;
