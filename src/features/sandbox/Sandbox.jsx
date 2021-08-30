import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { openModal } from '../../app/common/modals/modalReducer';
import TestMap from './TestMap';
import TestPlaceInput from './TestPlaceInput';
import { decrement, increment } from './testReducer';

export default function Sandbox() {
	const dispatch = useDispatch();
	const data = useSelector((state) => state.test.data);

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
				content='+'
				color='green'
				onClick={() => dispatch(increment(20))}
			/>
			<Button
				content='-'
				color='red'
				onClick={() => dispatch(decrement(10))}
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
