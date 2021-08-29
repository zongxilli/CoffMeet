import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { decrement, increment } from './testReducer';

export default function Sandbox() {
	const dispatch = useDispatch();
	const data = useSelector((state) => state.data);

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
		</>
	);
}
