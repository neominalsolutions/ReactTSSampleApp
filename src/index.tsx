import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CounterProvider } from './context/CounterContext';
import { AbilityContext } from './casl/Can';
import { Ability } from '@casl/ability';
import { Provider } from 'react-redux';
import { store } from './store/store';

export const CONFIG = require(`./config/config-${process.env.REACT_APP_ENV?.trim()}.json`);

const queryClient = new QueryClient(); // uygulamanın react query statelerini tüm uygulama genelinde desteklemesi için QueryClient sınıfından instace alıp QueryClientProvider olarak tüm uygulama sarmallıyoruz.

// tüm uygulama akışını ilgilendiren tüm yapılandırlamaları Index.tsx dosyasında yapıyoruz.

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

const ability = new Ability();

// provider store yapısı ile uygulama artık redux ile çalışacağını anladı. store üzerinden çalışacak.

root.render(
	<BrowserRouter>
		<Provider store={store}>
			<AbilityContext.Provider value={ability}>
				<CounterProvider>
					<QueryClientProvider client={queryClient}>
						<React.Suspense fallback={<>Sayfa yüklenemedi!</>}>
							<App />
						</React.Suspense>
					</QueryClientProvider>
				</CounterProvider>
			</AbilityContext.Provider>
		</Provider>
	</BrowserRouter>

	// <React.StrictMode>
	// sadece development da test amaçlı açık olan bir mod bu mod yüzünden component içerisindeki hooklar iki kez tetiklenir. ama production modda burası kapalı.
	/* BrowserRouter ile tüm uygulama sarmallıyoruz ve tüm uygulama JS routing yapar. */

	// </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
