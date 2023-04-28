import Layout from './layout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouteObject, useRoutes } from 'react-router-dom';
import AboutPage from './pages/about/AboutPage';
import HomePage from './pages/home/HomePage';
import Promises from './pages/promises/Promises';
import LoginPage from './pages/login/LoginPage';
import NewLoginPage from './pages/login/NewLoginPage';
import NewHomePage from './pages/home/NewHomePage';
import Counter from './pages/counter/Counter';
import { LocalStorageService } from './storage/LocalStorageService';
import { useContext } from 'react';
import { AbilityContext } from './casl/Can';
import { updateAbility } from './casl/Ability';

function App() {
	// eğer ki tarayıcı refreshlenirse bu durumda kullanıcı hala oturumu kapamadıysa git kullanıcın localstorage user-info bilgilerinden yeniden uygulama genelindeki yeteneklerinmi güncelle.
	const ability = useContext(AbilityContext);
	const user = LocalStorageService.getUserInfo();

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
			path: '/admin', // admin routes
			element: <>Admin Page</>,
			children: [
				{
					path: '/admin/users',
					element: <>User Page</>,
				},
			],
		},
	];
	//useRoutes();
	// useRoute ile uygulama bu routeları kullansın
	return useRoutes(routes);
}

export default App;
