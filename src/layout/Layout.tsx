import React, { useContext } from 'react';
import Menu from './Menu';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import { AbilityContext } from '../casl/Can';
// import { Outlet } from 'react-router-dom';

function Layout() {
	const ability = useContext(AbilityContext);

	return (
		<div>
			{/* developermode show denilen bir claim varsa bu durumda sadece header developerlar görebilir. */}
			{ability.can('DeveloperMode', 'Show') && (
				<Header text='React TS 18.2.0 version' />
			)}
			<Menu />

			<Container style={{ height: '100vh' }}>
				{/* dinamik içeriğin değişeceği kısmı outlet olarak iaşaretledik. sayfalar değişince buraya ilgili sayfa componentleri gelecek. */}
				<Outlet />
			</Container>

			<Container fluid>
				<Footer>
					{/* p olan jsx elementini Footer içinde Layout içerisinde gönderdik. children <p> elementi yakalıyp ilgili div içine basacaktır. */}
					<Row
						style={{
							textAlign: 'center',
							backgroundColor: 'GrayText',
							color: 'white',
							position: 'fixed',
							width: '100%',
							bottom: '0',
						}}>
						<p>
							<span>{'\u00a9'}</span> Gulsan Holding
						</p>
						<span>{new Date().getFullYear()}</span>
					</Row>
				</Footer>
			</Container>
		</div>
	);
}

export default Layout;
