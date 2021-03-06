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

		console.log('触发了 - 加载前');
		dispatch({ type: 'CLEAR_FOLLOWING_USER_BUG_FIX' });
		setLoading(true);

		async function fetchFollowingDoc() {
			try {
				const followingDoc = await getFollowingDoc(profile.id);

				if (followingDoc && followingDoc.exists) {
					console.log('Set了Following');
					dispatch(setFollowUser());
				}
			} catch (err) {
				toast.error(err.message);
			}
		}

		fetchFollowingDoc().then(() => setLoading(false));

		return () => {
			dispatch({ type: 'CLEAR_FOLLOWINGS' });
			console.log('触发了 - 离开页面');
			dispatch({ type: 'CLEAR_FOLLOWING_USER_BUG_FIX' });
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
						<Statistic horizontal color='teal'>
							<Statistic.Value>{profile.followingCount || 0}</Statistic.Value>
							<Statistic.Label>Following</Statistic.Label>
						</Statistic>
						<Statistic horizontal color='teal'>
							<Statistic.Value>{profile.followerCount || 0}</Statistic.Value>
							<Statistic.Label>Followers</Statistic.Label>
						</Statistic>
					</Statistic.Group>

					{!isCurrentUser && (
						<>
							<Divider />
							<Reveal animated='move' instant>
								<Reveal.Content visible style={{ width: '100%' }}>
									<Button
										fluid
										color={followingUser ? 'teal' : 'grey'}
										content={followingUser ? 'Following' : 'Not following'}
									/>
								</Reveal.Content>
								<Reveal.Content hidden style={{ width: '100%' }}>
									<Button
										fluid
										loading={loading}
										color={followingUser ? 'grey' : 'teal'}
										content={followingUser ? 'Unfollow' : 'Follow'}
										onClick={
											followingUser
												? () => unfollowUserHandler()
												: () => followUserHandler()
										}
									/>
								</Reveal.Content>
							</Reveal>
						</>
					)}
				</Grid.Column>
			</Grid>
		</Segment>
	);
}
