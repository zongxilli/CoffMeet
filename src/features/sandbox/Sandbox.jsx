import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Header, Modal, Progress } from 'semantic-ui-react';
import { openModal } from '../../app/common/modals/modalReducer';
import TestMap from './TestMap';
import TestPlaceInput from './TestPlaceInput';
import { decrement, increment } from './testReducer';

export default function Sandbox() {
	const dispatch = useDispatch();
	const data = useSelector((state) => state.test.data);
	const { loading } = useSelector((state) => state.async);

	const [target, setTarget] = useState(null);

	const defaultProps = {
		center: {
			lat: 10.99835602,
			lng: 77.01502627,
		},
		zoom: 11,
	};
	const [location, setLocation] = useState(defaultProps);

	function setLocationHandler(latLng) {
		setLocation({
			...location,
			center: { lat: latLng.lat, lng: latLng.lng },
		});
	}

	return (
		<>
			<h1>Testing 123</h1>
			<h3>The data is: {data} </h3>
			<Button
				name='increment'
				loading={loading && target === 'increment'}
				content='+'
				color='green'
				onClick={(e) => {
					dispatch(increment(20));
					setTarget(e.target.name);
				}}
			/>
			<Button
				name='decrement'
				loading={loading && target === 'decrement'}
				content='-'
				color='red'
				onClick={(e) => {
					dispatch(decrement(20));
					setTarget(e.target.name);
				}}
			/>
			<Button
				content='Open Modal'
				color='teal'
				onClick={() =>
					dispatch(
						openModal({
							modalType: 'TestModal',
							modalProps: { data },
						})
					)
				}
			/>

			<div style={{ marginTop: 15 }}>
				<TestPlaceInput setLocationHandler={setLocationHandler} />
				<TestMap location={location} />
			</div>
		</>
	);
}
