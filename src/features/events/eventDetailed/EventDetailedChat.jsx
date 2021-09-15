import React, { useEffect, useState } from 'react';
import { Comment, Header, Segment } from 'semantic-ui-react';
import EventDetailedChatForm from './EventDetailedChatForm';
import { useDispatch, useSelector } from 'react-redux';
import {
	formatFirebaseDataToArray,
	getEventChatRef,
} from '../../../app/firestore/firebaseService';
import { listenToEventChat } from '../eventActions';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import { createDataTree } from '../../../app/common/util/util';

export default function EventDetailedChat({ eventId }) {
	const dispatch = useDispatch();
	const { comments } = useSelector((state) => state.event);
	const [showReplyForm, setShowReplyForm] = useState({
		open: false,
		commentId: null,
	});

	function closeReplyFormHandler() {
		setShowReplyForm({ open: false, commentId: null });
	}

	useEffect(() => {
		getEventChatRef(eventId).on('value', (snapshot) => {
			if (!snapshot.exists()) return;

			dispatch(
				listenToEventChat(formatFirebaseDataToArray(snapshot.val()).reverse())
			);
		});
		return () => {
			dispatch({ type: 'CLEAR_COMMENTS' });
			getEventChatRef().off();
		};
	}, [eventId, dispatch]);

	return (
		<>
			<Segment
				textAlign='center'
				attached='top'
				inverted
				color='teal'
				style={{ border: 'none' }}
			>
				<Header>Chat about this event</Header>
			</Segment>

			<Segment attached>
				<EventDetailedChatForm
					eventId={eventId}
					parentId={0}
					closeForm={setShowReplyForm}
				/>

				<Comment.Group>
					{createDataTree(comments).map((comment) => (
						<Comment key={comment.id}>
							<Comment.Avatar src={comment.photoURL || '/assets/user.png'} />
							<Comment.Content>
								<Comment.Author as={Link} to={`/profile/${comment.uid}`}>
									{comment.displayName}
								</Comment.Author>
								<Comment.Metadata>
									<div>{formatDistance(comment.date, new Date())}</div>
								</Comment.Metadata>
								<Comment.Text>
									{comment.text.split('\n').map((text, index) => (
										<span key={index}>
											{text}
											<br />
										</span>
									))}
								</Comment.Text>
								<Comment.Actions>
									<Comment.Action
										onClick={() =>
											setShowReplyForm({ open: true, commentId: comment.id })
										}
									>
										Reply
									</Comment.Action>
									{showReplyForm.open &&
										showReplyForm.commentId === comment.id && (
											<EventDetailedChatForm
												eventId={eventId}
												parentId={comment.id}
												closeForm={closeReplyFormHandler}
											/>
										)}
								</Comment.Actions>
							</Comment.Content>

							{comment.childNodes.reverse().length > 0 && (
								<Comment.Group>
									{comment.childNodes.map((child) => (
										<Comment key={child.id}>
											<Comment.Avatar
												src={child.photoURL || '/assets/user.png'}
											/>
											<Comment.Content>
												<Comment.Author as={Link} to={`/profile/${child.uid}`}>
													{child.displayName}
												</Comment.Author>
												<Comment.Metadata>
													<div>{formatDistance(child.date, new Date())}</div>
												</Comment.Metadata>
												<Comment.Text>
													{child.text.split('\n').map((text, index) => (
														<span key={index}>
															{text}
															<br />
														</span>
													))}
												</Comment.Text>
												<Comment.Actions>
													<Comment.Action
														onClick={() =>
															setShowReplyForm({
																open: true,
																commentId: child.id,
															})
														}
													>
														Reply
													</Comment.Action>
													{showReplyForm.open &&
														showReplyForm.commentId === child.id && (
															<EventDetailedChatForm
																eventId={eventId}
																parentId={child.parentId}
																closeForm={closeReplyFormHandler}
															/>
														)}
												</Comment.Actions>
											</Comment.Content>
										</Comment>
									))}
								</Comment.Group>
							)}
						</Comment>
					))}
				</Comment.Group>
			</Segment>
		</>
	);
}
