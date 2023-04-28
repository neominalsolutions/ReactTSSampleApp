import React, { useContext } from 'react';
import CounterContext from '../../context/CounterContext';

function AboutPage() {
	const { counter } = useContext(CounterContext);

	return (
		<div>
			<h1>Hakkımızda Sayfası</h1>

			<p>Sayaç Değer: {counter}</p>
		</div>
	);
}

export default AboutPage;
