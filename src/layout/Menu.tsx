import React, { useContext } from 'react';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { LocalStorageService } from '../storage/LocalStorageService';
import { AbilityContext, Can } from '../casl/Can';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Ticket } from '../network/taskClient';
import { useTranslation } from 'react-i18next';

export interface IMenu {
	text: string;
	url: string;
}

function Menu() {
	const navigate = useNavigate();
	const ability = useContext(AbilityContext);
	const { t, i18n } = useTranslation(); // dil ile ilgili işlemleri yaptığımız hook.
	// t ile dili key değerine ekrana basabiliriz.

	// store bağlanıp store içindeki hangi state çekmek istersek o state useSelector() hook ileçağırıyoruz.
	const selectedTickets = useSelector(
		(state: RootState) => state.ticketState
	);

	const changeLang = (lng: string) => {
		console.log('lng', lng, i18n);
		i18n.changeLanguage(lng);
	};

	const menuList: Array<IMenu> = [
		{
			text: t('menu.home'),
			url: '/',
		},
		{
			text: t('menu.home'),
			url: '/home',
		},
		{
			text: t('menu.about'),
			url: '/about',
		},
		{
			text: t('menu.promise'),
			url: '/promises',
		},
		{
			text: t('menu.contextApi'),
			url: '/counter',
		},
		{
			text: t('menu.fileUpload'),
			url: '/file-upload',
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
							title={t('menu.languages')}
							id='basic-nav-dropdown'>
							<NavDropdown.Item
								onClick={() => changeLang('tr-TR')}>
								<div> Türkçe </div>
							</NavDropdown.Item>
							<NavDropdown.Item
								onClick={() => changeLang('en-US')}>
								<div> İngilizce </div>
							</NavDropdown.Item>
						</NavDropdown>

						<NavDropdown
							title={`${selectedTickets?.items.length} adet`}
							id='basic-nav-dropdown'>
							{selectedTickets?.items.map((ticket: Ticket) => {
								return (
									<NavDropdown.Item>
										<div>{ticket.description}</div>
									</NavDropdown.Item>
								);
							})}
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
						{/* {ability.can('unauthorized') && ( */}
						<NavDropdown.Item>
							<Link
								style={{ textDecoration: 'none' }}
								to={'/account/new-login'}>
								Oturum Aç (Yeni)
							</Link>
						</NavDropdown.Item>
						{/* )} */}

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
