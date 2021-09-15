import React, { useState } from 'react';
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
	unfollowUser,
} from '../../../app/firestore/firestoreService';

export default function ProfileHeader({ profile, isCurrentUser }) {
	const [loading, setLoading] = useState(false);

	async function followUserHandler() {
		setLoading(true);

		try {
			await followUser(profile);
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
						<Statistic label='Followers' value={10} />
						<Statistic label='Following' value={5} />
					</Statistic.Group>

					{!isCurrentUser && (
						<>
							<Divider />
							<Reveal animated='move'>
								<Reveal.Content visible style={{ width: '100%' }}>
									<Button fluid color='teal' content='Following' />
								</Reveal.Content>
								<Reveal.Content hidden style={{ width: '100%' }}>
									<Button
										basic
										fluid
										color='green'
										content='Follow'
										loading={loading}
										onClick={followUserHandler}
									/>
								</Reveal.Content>
							</Reveal>
							<Button
								basic
								fluid
								color='red'
								content='Unfollow'
								loading={loading}
								onClick={unfollowUserHandler}
							/>
						</>
					)}
				</Grid.Column>
			</Grid>
		</Segment>
	);
}
