import React, { useEffect, useState } from 'react';
import { TicketClient, Ticket } from '../../network/taskClient';
import TicketCard from '../../components/TicketCard';
import { Col, Row } from 'react-bootstrap';
import EmployeeSelector from '../../components/EmployeeSelector';
import { Employee, EmployeeClient } from '../../network/employeeClient';

const fetchTickets = async (signal: any) => {
	// fetch default httpget çalışır.
	fetch('https://localhost:7044/api/Tickets', { signal })
		.then((response) => response.json())
		.then((data) => {
			console.log('data', data);
		})
		.catch((err: any) => {
			console.log(err);
		})
		.finally(() => {
			// loading hide
			// hata yada başarılı olmaya bakmaksızın çalışan blok
			alert('istek sonladı');
		});
};

function HomePage() {
	// let tickets: Ticket[] = [];
	const [tickets, setTickets] = useState<Ticket[]>([]);
	const [employees, setEmployees] = useState<Employee[]>([]);

	const ticketClient = new TicketClient(); // ticketClient instance aldık bağlantık.
	const employeeClient = new EmployeeClient();

	const loadData = async () => {
		setTickets(await ticketClient.getTickets()); // client apidan veri çektik.
		setEmployees(await employeeClient.getEmployees());

		console.log('tickets', await ticketClient.getTickets());
	};

	useEffect(() => {
		loadData(); // veriyi çek.
		// const interval = setInterval(() => {
		// 	console.log('int');
		// }, 1000);
		// burası homepage componentine istek atıldığında apidan veri çekmemizi sağlayan hook. async çalışır. sayfa açılışında apidan veri çekme işlemleri bu hook içerisinde yazılır.
		// sayfa yüklenirken componente gösterilecek olan verinin hazır hale gelmesini istiyorsak bu hook kullanımı önerilir.
		// axios ile yapabiliriz
		// js fetch paketi
		// reactQuery => axios
		// network isteği bittikten sonra network isteğini kesmek için kaynağın geri tarayıcıya verilmesi için bir performans ayarı
		console.log('component doma girdi');
		const controller = new AbortController();
		const signal = controller.signal;
		// fetchTickets(signal);
		// clean up function
		return () => {
			// component domdan ayrıldığında component içinde bağlı bir kaynak varsa kesinti yapacağımız kısım
			// component bir route değişikliğinde domdan çıktığında burası tetiklenir
			console.log('component domdan ayrıldı');
			// clearInterval(interval);
			controller.abort();
			// kaynakları dispose ettiğimiz yer.
		};
	}, []); // burada herhangi bir state olmadığında hiç bir state değişimini takip etme sadece sayfa açılışın 1 kez çalış. // sayfa açılırken apidan veri çekme işleminde sadece [] kullanırız.

	// useEffect(() => {
	// 	console.log('[] tanımı yapmadık her bir state değişiminde çalıştı');
	// }); // state ne olduğu önemli değil herhangi bir state değişiminde çalış.

	/*
	useEffect(() => {
		console.log('sadece counter state her değişimini takip edecektir');
		// api istek atamdan arayüzde bir işlem yapmışım.yada interval timer gibi yapılar kullanmadım.
		// api bağlanmıyporsak retur functiona gerek yok.
	}, [c, counter]); // [state dependency diyoruz] // ya c yada counter state takip et, istedeiğimiz kadar state takibini yapabiliriz. [state1,state2] yazılan statelerin takibini yapar.

	*/

	const employeSelect = async (selection: string) => {
		// git ticketları idsine göre filterele state değiştir.

		// api state güncelle
		if (selection == 'tümü') {
			setTickets(await ticketClient.getTickets());
		} else {
			setTickets(await ticketClient.getTicketsByCustomer(selection));
		}
	};
	return (
		<div>
			<Row>
				<Col>
					{employees.length > 0 ? (
						<EmployeeSelector
							// onSelected={async (id: string) => {
							// 	setTickets(
							// 		await ticketClient.getTicketsByCustomer(id)
							// 	);
							// }}
							onSelected={async (selection: string) =>
								employeSelect(selection)
							}
							employees={employees}
						/>
					) : (
						<></>
					)}
				</Col>
			</Row>
			<Row>
				<Col>
					{tickets.length > 0 ? (
						<TicketCard tickets={tickets} />
					) : (
						<></>
					)}
				</Col>
			</Row>
		</div>
	);
}

export default HomePage;
