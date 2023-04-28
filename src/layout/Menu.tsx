import React, { useContext } from 'react';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { LocalStorageService } from '../storage/LocalStorageService';
import { AbilityContext, Can } from '../casl/Can';

export interface IMenu {
	text: string;
	url: string;
}

function Menu() {
	const navigate = useNavigate();
	const ability = useContext(AbilityContext);

	const menuList: Array<IMenu> = [
		{
			text: 'Anasayfa',
			url: '/',
		},
		{
			text: 'Anasayfa Yeni',
			url: '/home',
		},
		{
			text: 'Hakkımızda',
			url: '/about',
		},
		{
			text: 'Promise Örneği',
			url: '/promises',
		},
		{
			text: 'Context API Örneği',
			url: '/counter',
		},
	];

	return (
		<Navbar
			bg='light'
			expand='lg'>
			<Container>
				<Navbar.Brand href='/'>Gulsan Holding</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto'>
						{menuList.map((menu: IMenu, index: number) => {
							return (
								<Nav.Link key={index}>
									<Link to={menu.url}>{menu.text}</Link>
								</Nav.Link>
							);
						})}

						<NavDropdown
							title='Yapılacaklar'
							id='basic-nav-dropdown'>
							<NavDropdown.Item>
								<div>Görev 1</div>
							</NavDropdown.Item>
							<NavDropdown.Item>
								<div>Görev 2</div>
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>

				<Navbar.Collapse
					id='basic-navbar-nav'
					className='justify-content-end'>
					<NavDropdown
						title='Hesap'
						id='basic-nav-dropdown'>
						{ability.can('unauthorized') && (
							<NavDropdown.Item>
								<Link
									style={{ textDecoration: 'none' }}
									to={'/account/login'}>
									Oturum Aç
								</Link>
							</NavDropdown.Item>
						)}
						{ability.can('unauthorized') && (
							<NavDropdown.Item>
								<Link
									style={{ textDecoration: 'none' }}
									to={'/account/new-login'}>
									Oturum Aç (Yeni)
								</Link>
							</NavDropdown.Item>
						)}

						{ability.can('authorized') && (
							<NavDropdown.Item>
								<div
									onClick={() => {
										LocalStorageService.clearTokens();
										navigate('/account/new-login');
									}}
									className='link text-primary'>
									Oturumu Kapat
								</div>
							</NavDropdown.Item>
						)}
						<Can
							I='login'
							an='adminPanel'
							ability={ability}>
							<NavDropdown.Item>
								<div
									onClick={() => {
										navigate('/admin');
									}}
									className='link text-primary'>
									Yönetici Girişi
								</div>
							</NavDropdown.Item>
						</Can>
					</NavDropdown>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Menu;
