const initialState = {
	currentUserProfile: null,
	selectedUserProfile: null,
	photos: [],
	profileEvents: [],
	followers: [],
	followings: [],
	followingUser: false,
	feed: [],
};

export default function profileReducer(
	state = initialState,
	{ type, payload }
) {
	switch (type) {
		case 'LISTEN_TO_CURRENT_USER_PROFILE':
			return {
				...state,
				currentUserProfile: payload,
			};

		case 'LISTEN_TO_SELECTED_USER_PROFILE':
			return {
				...state,
				selectedUserProfile: payload,
			};

		case 'LISTEN_TO_USER_PHOTOS':
			return {
				...state,
				photos: payload,
			};

		case 'LISTEN_TO_USER_EVENTS':
			return {
				...state,
				profileEvents: payload,
			};

		case 'LISTEN_TO_FOLLOWERS':
			return {
				...state,
				followers: payload,
			};

		case 'LISTEN_TO_FOLLOWINGS':
			return {
				...state,
				followings: payload,
			};

		case 'SET_FOLLOW_USER':
			return {
				...state,
				followingUser: true,
			};

		case 'SET_UNFOLLOW_USER':
			return {
				...state,
				followingUser: false,
			};

		case 'CLEAR_FOLLOWINGS':
			return {
				...state,
				followers: [],
				followings: [],
			};

		case 'LISTEN_TO_FEED':
			return {
				...state,
				feed: payload,
			};

		case 'CLEAR_FOLLOWING_USER_BUG_FIX':
			return {
				...state,
				followingUser: false,
			};

		default: {
			return state;
		}
	}
}
