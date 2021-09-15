import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
	Button,
	Divider,
	Grid,
	Header,
	Item,
	Reveal,
	Segment,
	Statistic,
} from 'semantic-ui-react';
import {
	followUser,
	getFollowingDoc,
	unfollowUser,
} from '../../../app/firestore/firestoreService';
import { setFollowUser, setUnfollowUser } from '../profileActions';

export default function ProfileHeader({ profile, isCurrentUser }) {
	const dispatch = useDispatch();
	const { followingUser } = useSelector((state) => state.profile);

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (isCurrentUser) return;

		setLoading(true);

		async function fetchFollowingDoc() {
			try {
				const followingDoc = await getFollowingDoc(profile.id);

				if (followingDoc && followingDoc.exists) {
					dispatch(setFollowUser());
				}
			} catch (err) {
				toast.error(err.message);
			}
		}

		fetchFollowingDoc().then(() => setLoading(false));

		return () => {
			dispatch({ type: 'CLEAR_FOLLOWINGS' });
		};
	}, [dispatch, profile.id, isCurrentUser]);

	async function followUserHandler() {
		setLoading(true);

		try {
			await followUser(profile);
			dispatch(setFollowUser());
		} catch (err) {
			toast.error(err.message);
		} finally {
			setLoading(false);
		}
	}

	async function unfollowUserHandler() {
		setLoading(true);

		try {
			await unfollowUser(profile);
			dispatch(setUnfollowUser());
		} catch (err) {
			toast.error(err.message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Segment>
			<Grid>
				<Grid.Column width={12}>
					<Item.Group>
						<Item>
							<Item.Image
								avatar
								size='small'
								src={profile.photoURL || '/assets/user.png'}
							/>
							<Item.Content verticalAlign='middle'>
								<Header
									as='h1'
									style={{ display: 'block', marginBottom: '10px' }}
									content={profile.displayName}
								/>
							</Item.Content>
						</Item>
					</Item.Group>
				</Grid.Column>
				<Grid.Column width={4}>
					<Statistic.Group>
						<Statistic label='Followers' value={profile.followerCount || 0} />
						<Statistic label='Following' value={profile.followingCount || 0} />
					</Statistic.Group>

					{!isCurrentUser && (
						<>
							<Divider />
							<Button
								animated='fade'
								style={{ width: '100%' }}
								loading={loading}
								onClick={
									followingUser
										? () => unfollowUserHandler()
										: () => followUserHandler()
								}
								color={followingUser ? 'pink' : 'teal'}
							>
								<Button.Content visible>
									{followingUser ? 'Following' : 'Not following'}
								</Button.Content>
								<Button.Content hidden>
									{followingUser ? 'Unfollow' : 'Follow'}
								</Button.Content>
							</Button>
						</>
					)}
				</Grid.Column>
			</Grid>
		</Segment>
	);
}
