import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Card, Grid, Header, Image, Tab } from 'semantic-ui-react';
import PhotoUploadWidget from '../../../app/common/photos/PhotoUploadWidget';
import { deleteFromFirebaseStorage } from '../../../app/firestore/firebaseService';
import {
	deletePhotoFromCollection,
	getUserPhotos,
	setMainPhoto,
} from '../../../app/firestore/firestoreService';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';
import { listenToUserPhotos } from '../profileActions';

export default function PhotosTab({ profile, isCurrentUser }) {
	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.async);
	const { photos } = useSelector((state) => state.profile);

	const [editMode, setEditMode] = useState(false);
	const [updating, setUpdating] = useState({ isUpdating: false, target: null });
	const [deleting, setDeleting] = useState({ isDeleting: false, target: null });

	useFirestoreCollection({
		query: () => getUserPhotos(profile.id),
		data: (photos) => dispatch(listenToUserPhotos(photos)),
		deps: [profile.id, dispatch],
	});

	async function setMainPhotoHandler(photo, target) {
		setUpdating({ isUpdating: true, target: target });

		try {
			await setMainPhoto(photo);
		} catch (err) {
			toast.error(err.message);
		} finally {
			setUpdating({ isUpdating: false, target: null });
		}
	}

	async function deletePhotoHandler(photo, target) {
		setDeleting({ isDeleting: true, target: target });

		try {
			await deleteFromFirebaseStorage(photo.name);
			await deletePhotoFromCollection(photo.id);
		} catch (err) {
			toast.error(err.message);
		} finally {
			setDeleting({ isDeleting: false, target: null });
		}
	}

	return (
		<Tab.Pane loading={loading}>
			<Grid>
				<Grid.Column width={16}>
					<Header floated='left' icon='user' content={`Photos`} />
					{isCurrentUser && (
						<Button
							onClick={() => setEditMode(!editMode)}
							floated='right'
							basic
							content={editMode ? 'Cancel' : 'Add Photo'}
						/>
					)}
				</Grid.Column>
				<Grid.Column width={16}>
					{editMode ? (
						<PhotoUploadWidget setEditMode={setEditMode} />
					) : (
						<Card.Group itemsPerRow={5}>
							{photos.map((photo) => (
								<Card key={photo.id}>
									<Image src={photo.url} />
									<Button.Group fluid width={2}>
										<Button
											basic
											name={photo.id}
											color='green'
											content='Main'
											loading={
												updating.isUpdating && updating.target === photo.id
											}
											disabled={photo.url === profile.photoURL}
											onClick={(e) => setMainPhotoHandler(photo, e.target.name)}
										/>
										<Button
											basic
											name={photo.id}
											color='red'
											icon='trash'
											loading={
												deleting.isDeleting && deleting.target === photo.id
											}
											disabled={photo.url === profile.photoURL}
											onClick={(e) => deletePhotoHandler(photo, e.target.name)}
										/>
									</Button.Group>
								</Card>
							))}
						</Card.Group>
					)}
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	);
}
