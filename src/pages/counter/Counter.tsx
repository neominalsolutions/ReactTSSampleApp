import React, { useContext } from 'react';
import CounterContext from '../../context/CounterContext';

function Counter() {
	const { counter, setCounter } = useContext(CounterContext);

	return (
		<div>
			Sayaç: {counter}
			<button onClick={() => setCounter(counter + 1)}> Artır</button>
		</div>
	);
}

export default Counter;
