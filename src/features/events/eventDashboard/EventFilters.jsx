import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Calendar from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';

import { setFilter, setStartDate } from '../eventActions';

export default function EventFilters({ loading }) {
	const dispatch = useDispatch();

	const { authenticated } = useSelector((state) => state.auth);
	const { filter, startDate } = useSelector((state) => state.event);

	return (
		<>
			{authenticated && (
				<Menu vertical size='large' style={{ width: '100%' }}>
					<Header icon='filter' attached color='purple' content='Filters' />
					<Menu.Item
						content='All Events'
						disabled={loading}
						active={filter === 'all'}
						onClick={() => dispatch(setFilter('all'))}
					/>
					<Menu.Item
						content="I'm going"
						disabled={loading}
						active={filter === 'isGoing'}
						onClick={() => dispatch(setFilter('isGoing'))}
					/>
					<Menu.Item
						content="I'm hosting"
						disabled={loading}
						active={filter === 'isHost'}
						onClick={() => dispatch(setFilter('isHost'))}
					/>
				</Menu>
			)}

			<Header icon='calendar' attached color='purple' content='Select date' />
			<Calendar
				value={startDate || new Date()}
				onChange={(date) => dispatch(setStartDate(date))}
				tileDisabled={() => loading}
			/>
		</>
	);
}
