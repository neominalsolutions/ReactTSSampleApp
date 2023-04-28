import React, { useRef, useState } from 'react';
export default function List() {
	const [messages, setMessages] = useState<string[]>([]);
	const [mode, setMode] = useState<string>('create');
	const [selectedIndex, setSelectedIndex] = useState<number>(-1);

	//const [message, setMessage] = useState(""); // arayüzün her bir tuşa basıldığında arayüzü yeniden render ediyordu buda component performansını düşürüyor;

	// html elementin referansına erişmemi sağlayan bir hook.
	// element referans üzerinden value editValue set ediceğiz.
	const inptRef = useRef<HTMLInputElement | null>(null); // inputa ait arayüzdeki referansları sanki document.getElementById() sinden yakalar gibi input referansından yakalamak için kullandığımız bir hook.
	// <input id="inpt" /> $('#inpt').value(); gerçek dom üzerinden inputun valusunu getirir. bu yöntemin react tarafındaki karşılığı useRef hook

	// let message = "";

	const InputChange = (event: any) => {
		console.log('event', event);
		// eventten gelen mesaj değerini yakaldık bunu message state aktardık. set ettik.
		// setMessage(event.target.value);
		// message = event.target.value;
		// console.log("m", message);
	};

	const addItem = () => {
		// add message to list
		// liste içerisine mesajımı push et ama prepend olarak push et
		// set edilen mesaj değerini listeye ilk item olarak push ettik.//messages state değiştiridik.
		// spread operatörü kullandık.
		// messages.push(message);
		// ... spread operatör ile obje yada dizi referansı güncelleyebiliyoruz.
		// setMessages([message, ...messages]); //prepend
		// aynı text değerinde item varsa aynısından var mesajı versin

		let message = (inptRef.current as HTMLInputElement).value;

		const sameExist = messages.find((item) => item === message);
		if (sameExist != null) {
			alert('Aynı kayıttan giremezsiniz');
		} else {
			console.log('m', message);
			setMessages([...messages, message]); // append
			// veri girişinden sonra input temizle
			(inptRef.current as HTMLInputElement).value = '';
		}

		// setMessages([...messages, message]);
	};

	const deleteItem = (index: number): void => {
		console.log('index', index);
		// const removeItem = messages[index];
		// messages.findIndex(x=> x == "ali");
		// console.log("removeItem", index);
		// const filteredItems = messages.filter((item) => item !== removeItem);

		messages.splice(index, 1); // dizi içinde index üzerinden silmek için splice kullanırız.

		// setMessages(filteredItems);
		setMessages([...messages]);
	};

	const editItem = (index: number) => {
		const editValue = messages[index];
		console.log('inptRef', inptRef);
		// elemente ait value değerini set ettik
		// $('#elementRef').val(editValue);
		(inptRef.current as HTMLInputElement).value = editValue;
		(inptRef.current as HTMLInputElement).focus(); // javascript referansına eriştiğim için ister stil uygularım ister bir özellik eklerim
		setMode('edit');
		setSelectedIndex(index); // seçili indeksi bulduk
	};

	const updateItem = () => {
		// debugger;
		console.log('selectedIndex', selectedIndex);
		// lodash cloneDeep ile nesne referanslarının koparaılması işlemini js tarafında nasıl çözeriz bunu ekleyelim.
		// let _messages = _.cloneDeep(messages);

		// let item = _messages[selectedIndex];
		// item = inptRef.current.value;

		// item = inptRef.current.value;
		// console.log("item", item);
		// let items = [...messages];

		const updatedMessages = messages.map((item, index) => {
			if (index === selectedIndex) {
				item = (inptRef.current as HTMLInputElement).value;
			}

			return item;
		});

		setMessages([...updatedMessages]);
		setMode('create');
		setSelectedIndex(-1);
		(inptRef.current as HTMLInputElement).value = '';
	};

	// razorde @foreach kullanıyorduk react da ise array.map() ile element içerisinde dönüyoruz.
	// $.each(collection,(item,index){})
	// <></> sadece ayraç görevi görür <></> kapsayısını kullandığınızda ayraca stil,attribute, className değerleri geçemeyiz.
	// map ile çalışırken her bir return olan item'ın bir key değerien unique bir arayüzde id değerine ihtiyaç var. react bu sayede her bir elementin virtual domda farklı bir unique element olduğunu anlıyor.

	const ItemTemplate = (message: string, index: number): JSX.Element => {
		return (
			<div
				style={{ color: 'red', padding: '10px' }}
				key={index}>
				<li>
					{index + 1}. mesaj: {message}
				</li>
				<button onClick={() => deleteItem(index)}>Sil</button>
				<button onClick={() => editItem(index)}>Düzenle</button>
			</div>
		);
	};

	//const [mode, setMode] = useState("create");

	return (
		<div>
			<input
				onChange={(event) => InputChange(event)}
				ref={inptRef}
				placeholder='mesaj giriniz'
			/>

			{/* jsx dosyasında ternaryif ile condition yapabiliriz */}
			{mode !== 'edit' ? (
				<button onClick={addItem}>Ekle</button>
			) : (
				<button onClick={updateItem}>Güncelle</button>
			)}

			<hr></hr>
			<ul>
				{messages.map((message, index) => {
					return ItemTemplate(message, index);
				})}
			</ul>
		</div>
	);
}
