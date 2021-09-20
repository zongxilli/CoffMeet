import React from 'react';
import EventListItem from './EventListItem';
import InfiniteScroll from 'react-infinite-scroller';
import { Button, Header, Icon } from 'semantic-ui-react';

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
					<Header as='h3'>
						{moreEvents
							? 'Scroll down for more events : )'
							: 'You have reached the end of events : )'}
						{!moreEvents && (
							<Button
								size='mini'
								color='teal'
								floated='right'
								content='Back to top'
								onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
							/>
						)}
					</Header>
				</InfiniteScroll>
			)}
		</>
	);
}
