import { createContext, useState } from 'react';

// createContext ile önce context açıp sonra onu Provider olarak dışarı export ediyoruz ki App.js tarafında provider ilgili componentleri sarsın.
const CounterContext = createContext();

// counter provider içerisine gönderilecek olan child componentler children ismi ilke gönderilir.
// uygulamadaki tüm componentleri bu provider ile sarmallıyoruz.
export const CounterProvider = ({ children }) => {
	// setCardItems state değiştirir.
	// cardItems değişen state global olarak erişmemizi sağlar.

	const [counter, setCounter] = useState(0);
	// seçili olan temamızı context state aldık.
	// useState normalde local component bazlı çalışır
	// fakat contextAPI yöntemi ile birlikte sayfalar arası geçişlerde de browser refleshlenene kadar state global olarak saklayabiliriz.

	let values = {
		counter,
		setCounter,
	};

	// başka componentlere state taşımak için values olarak bir değişken ayarladık
	// children ile alt komponentleri provider içerisine sardık.

	return (
		<CounterContext.Provider value={values}>
			{children}
			{/* children ile provider içine sarılmış ne kadar alt component child component varsa hepsine bu bilgiyi gönderiyoruz. */}
		</CounterContext.Provider>
	);
};

export default CounterContext;
