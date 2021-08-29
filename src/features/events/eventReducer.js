import { sampleData } from '../../app/api/sampleData';

const initialState = {
	events: sampleData,
};

export default function eventReducer(
	state = initialState,
	{ type, payload }
) {
	switch (type) {
		case 'CREATE_EVENT':
			return {
				...state,
				events: [...state.events, payload],
			};

		case 'UPDATE_EVENT':
			return {
				...state,
				events: [
					...state.events.filter((evt) => evt.id !== payload.id),
					payload,
				],
			};

		case 'DELETE_EVENT':
			return {
				...state,
				events: [
					...state.events.filter((evt) => evt.id !== payload),
				],
			};
            
		default:
			return state;
	}
}
