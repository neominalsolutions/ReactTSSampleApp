import Layout from './layout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Outlet, RouteObject, useRoutes } from 'react-router-dom';
import { LocalStorageService } from './storage/LocalStorageService';
import { lazy, useContext } from 'react';
import { AbilityContext } from './casl/Can';
import { updateAbility } from './casl/Ability';
import AuthGuard from './guards/AuthGuard';
import UnAuthorizedPage from './pages/unauthorized/UnAuthorizedPage';
import { UserProfileService } from './storage/UserProfileService';
import AdminGuard from './guards/AdminGuard';
import { Col, Container, Row } from 'react-bootstrap';
import UsersDetailPage from './pages/users-detail/UsersDetailPage';
import FileUploadPage from './pages/uploads/FileUploadPage';

const HomePage = lazy(() => import('./pages/home/HomePage'));
const NewHomePage = lazy(() => import('./pages/home/NewHomePage'));
const AboutPage = lazy(() => import('./pages/about/AboutPage'));
const Promises = lazy(() => import('./pages/promises/Promises'));
const LoginPage = lazy(() => import('./pages/login/LoginPage'));
const NewLoginPage = lazy(() => import('./pages/login/NewLoginPage'));
const Counter = lazy(() => import('./pages/counter/Counter'));

function App() {
	// eğer ki tarayıcı refreshlenirse bu durumda kullanıcı hala oturumu kapamadıysa git kullanıcın localstorage user-info bilgilerinden yeniden uygulama genelindeki yeteneklerinmi güncelle.
	const ability = useContext(AbilityContext);
	const user = UserProfileService.getUserInfo();

	// yeteneklerinmi güncelle.
	updateAbility(ability, user);

	// bu uygulamanın ilk ayağa kalktığı dosya olduğu için tüm yönlendirme routing.config dosyaları buradan çalıacaktır.
	// useRoutes hook artık uygulamanın clientside route tanımlarını okumasını sağlarız.
	const routes: RouteObject[] = [
		{
			path: '/',
			element: <Layout />, // nested route yapısı ile layout altında tanımlanan children dizisindeki tanımların hepsi layout component üzerinden çalışacaktır.
			children: [
				{
					path: '/',
					element: <HomePage />,
				},
				{
					path: '/home',
					element: <NewHomePage />,
				},
				{
					path: '/about',
					element: <AboutPage />,
				},
				{
					path: '/promises',
					element: <Promises />,
				},
				{
					path: '/counter',
					element: <Counter />,
				},
				{
					path: '/file-upload',
					element: <FileUploadPage />,
				},
			],
		},
		{
			path: '/account/login',
			element: <LoginPage />,
		},
		{
			path: '/account/new-login',
			element: <NewLoginPage />,
		},
		{
			path: '/account/unauthorized',
			element: <UnAuthorizedPage />,
		},
		{
			path: '/admin', // admin routes
			// sadece login olan kullanıcılar admin sayfasına girebilsin diye // <>Admin Page</> componenti AuthGuard arasına aldık
			element: (
				<AuthGuard>
					<Container fluid>
						<Row>
							<Col>
								<h1>Admin Layout</h1>
								<nav>
									<Link to='users'>Admin Users</Link>{' '}
									<Link to='/home'>Anasayfa</Link>{' '}
									<Link to='users/1'>User By Id</Link>{' '}
									{/* <Link to=''>Anasayfa</Link> Admin routeları altında olduğumuz için direkt admin route gitti  <Link to='home'>Anasayfa</Link> /admin/home route yapıcaktır dikkat edelim. */}
								</nav>
								<main
									className='m-5 p-3'
									style={{
										borderColor: 'gray',
										borderWidth: 1,
										borderStyle: 'solid',
									}}>
									<Outlet />
								</main>
							</Col>
						</Row>
					</Container>
				</AuthGuard>
			),
			children: [
				{
					path: '/admin/users',
					element: (
						<AdminGuard>
							<>User Page</>
						</AdminGuard>
					),
				},
				{
					path: '/admin/users/:id', // dinamik olarak parametre bazlı route tanımlama
					element: <UsersDetailPage />,
				},
			],
		},
		{
			path: '*', // eğer yukarıdaki pathlerden biri bulunmazsa bu durumda bir componente yönlendirerek bu sayfanın olmadığını söyleriz
			element: <>Not Found Page</>,
		},
	];
	//useRoutes();
	// useRoute ile uygulama bu routeları kullansın
	return useRoutes(routes);
}

export default App;
