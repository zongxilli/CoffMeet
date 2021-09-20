import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Feed, Header, Segment } from 'semantic-ui-react';
import {
	formatFirebaseDataToArray,
	getUserFeedRef,
} from '../../../app/firestore/firebaseService';
import { listenToFeed } from '../../profiles/profileActions';
import EventFeedItem from './EventFeedItem';

export default function EventsFeed() {
	const dispatch = useDispatch();
	const { feed } = useSelector((state) => state.profile);

	useEffect(() => {
		getUserFeedRef().on('value', (snapshot) => {
			if (!snapshot.exists()) {
				return;
			}

			const feed = formatFirebaseDataToArray(snapshot.val()).reverse();

			dispatch(listenToFeed(feed));
		});

		return () => {
			//! Me Added ?  v
			getUserFeedRef()?.off();
		};
	}, [dispatch]);

	return (
		<>
			<Header attached color='purple' icon='newspaper' content='News feed' />
			<Segment attached='bottom'>
				<Feed>
					{feed.map((post) => (
						<EventFeedItem post={post} key={post.id} />
					))}
				</Feed>
			</Segment>
		</>
	);
}
