import React from 'react';
import EventListItem from './EventListItem';
import InfiniteScroll from 'react-infinite-scroller';
import { Header } from 'semantic-ui-react';

export default function EventList({
	events,
	getNextEvents,
	loading,
	moreEvents,
}) {
	return (
		<>
			{events.length !== 0 && (
				<InfiniteScroll
					pageStart={0}
					loadMore={getNextEvents}
					hasMore={!loading && moreEvents}
					initialLoad={false}
				>
					{events.map((event) => (
						<EventListItem event={event} key={event.id} />
					))}
					<Header content='Scroll down for more events' />
				</InfiniteScroll>
			)}
		</>
	);
}
