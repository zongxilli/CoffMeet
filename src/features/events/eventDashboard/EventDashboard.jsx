import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Loader } from 'semantic-ui-react';

import EventFilters from './EventFilters';
import EventList from './EventList';
import EventListItemPlaceholder from './EventListItemPlaceholder';
import { fetchEvents } from '../eventActions';
import EventsFeed from './EventsFeed';

export default function EventDashboard() {
	const dispatch = useDispatch();

	const { events, moreEvents, filter, startDate, lastVisible, retainState } =
		useSelector((state) => state.event);
	const { loading } = useSelector((state) => state.async);
	const { authenticated } = useSelector((state) => state.auth);

	const limit = 2;
	const [loadingInitial, setLoadingInitial] = useState(false);

	useEffect(() => {
		if (retainState) return;

		setLoadingInitial(true);
		dispatch(fetchEvents(filter, startDate, limit)).then(() => {
			setLoadingInitial(false);
		});

		return () => {
			dispatch({ type: 'RETAIN_STATE' });
		};
	}, [dispatch, filter, startDate, retainState]);

	function fetchNextEventsHandler() {
		//! Me Add timeout to make scrolling real
		setTimeout(() => {
			dispatch(fetchEvents(filter, startDate, limit, lastVisible));
		}, 300);
	}

	return (
		<Grid>
			<Grid.Column width={6}>
				{authenticated && <EventsFeed />}
				<EventFilters loading={loading} />
			</Grid.Column>
			<Grid.Column width={10}>
				{loadingInitial && (
					<>
						<EventListItemPlaceholder />
						<EventListItemPlaceholder />
					</>
				)}
				<EventList
					events={events}
					getNextEvents={fetchNextEventsHandler}
					loading={loading}
					moreEvents={moreEvents}
				/>
			</Grid.Column>
			<Grid.Column width={10}>
				<Loader active={loading} />
			</Grid.Column>
		</Grid>
	);
}
