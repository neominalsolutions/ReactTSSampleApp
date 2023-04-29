import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { CONFIG } from '..';
import styled from 'styled-components';

export type HeaderProps = {
	text: string; // required
	content?: string; // optional
};

const Title = styled.h1`
	font-size: 1.5em;
	text-align: center;
	color: palevioletred;
`;

function Header({ text, content = 'Content' }: HeaderProps) {
	return (
		<Container
			fluid
			style={{ backgroundColor: 'GrayText', color: 'white' }}>
			<Row>
				<h5>
					<Title>{text}</Title>
				</h5>
				{/* <p>{process.env.REACT_APP_EmployeeEndPoint} Mode</p> */}
				<p>{CONFIG.ENV}</p>

				{/* <p>{content}</p> */}
			</Row>
		</Container>
	);
}

export default Header;

// Not: React TS de defaultProps ve PropTypes yoktur bunun yerine type tipinde bir değer açarak required ve optional olan değerleri tanımlayabilir ve default değer vericek ise propslara direk geçerbiliriz.
