import React, { useEffect, useState } from 'react';
import { TicketClient, Ticket } from '../../network/taskClient';
import TicketCard from '../../components/TicketCard';
import { Col, Row } from 'react-bootstrap';
import EmployeeSelector from '../../components/EmployeeSelector';
import { Employee, EmployeeClient } from '../../network/employeeClient';
import { useQuery } from 'react-query';

function NewHomePage() {
	// let tickets: Ticket[] = [];
	const [tickets, setTickets] = useState<Ticket[]>([]);
	const [employees, setEmployees] = useState<Employee[]>([]);
	const [empId, setEmpId] = useState<string>('tümü');

	const ticketClient = new TicketClient(); // ticketClient instance aldık bağlantık.
	const employeeClient = new EmployeeClient();

	function getEmployees() {
		return useQuery({
			queryKey: ['employee-list'], // unique bir key bu key cache için önemli eğer cache bozup bir daha fetch edecek isek bu durumda queryClient üzerinden bir invalidQueryKey() methodu çağırırız.
			queryFn: async () => {
				return await employeeClient.getEmployees();
			},
			onSuccess: (empl: Employee[]) => {
				console.log('empl', empl);
				// state güncelleme işlemin artık useEffect içinde yapmıyoruz çünkü useQuery hook kullandığımız için kendi hook içerisinde success durumda state güncelliyoruz
				setEmployees(empl);
			},
			onError: (error: any) => {
				console.log('emp-error', error);
			},
			//refetchInterval: 5000, // 5000 ms 5 sn de bir güncelleneceği anlamına gelir bunu arkaplanda kendisi yönetiyor.
		});
	}

	function getTickets() {
		return useQuery({
			queryKey: ['ticket-list', empId], // unique bir key bu key cache için önemli eğer cache bozup bir daha fetch edecek isek bu durumda queryClient üzerinden bir invalidQueryKey() methodu çağırırız.
			queryFn: async ({ signal }) => {
				if (empId == 'tümü') {
					return await ticketClient.getTickets({ signal });
				} else {
					return await ticketClient.getTicketsByCustomer(empId);
				}
			},
			onSuccess: (tickets: Ticket[]) => {
				console.log('tickets', tickets);
				// state güncelleme işlemin artık useEffect içinde yapmıyoruz çünkü useQuery hook kullandığımız için kendi hook içerisinde success durumda state güncelliyoruz
				setTickets(tickets);
			},
			onError: (error: any) => {
				console.log('ticket-error', error);
			},
		});
	}

	const employeeQuery = getEmployees();
	const ticketQuery = getTickets();

	useEffect(() => {
		return () => {};
	}, []); // burada herhangi bir state olmadığında hiç bir state değişimini takip etme sadece sayfa açılışın 1 kez çalış. // sayfa açılırken apidan veri çekme işleminde sadece [] kullanırız.

	const employeSelect = async (selection: string) => {
		// empId state güncelledik. useQuery bu güncel empId üzerinden cache bozar ve yeni refetch işlemi auto gerçekleştirir.
		// alert(selection);
		setEmpId(selection);
		// employeeQuery.refetch();
	};
	return (
		<div>
			selection : {empId}
			<Row>
				<Col>
					{employeeQuery.isFetched && employeeQuery.isSuccess && (
						<EmployeeSelector
							onSelected={async (selection: string) =>
								employeSelect(selection)
							}
							employees={employees}
						/>
					)}
				</Col>
			</Row>
			<Row>
				<Col>
					{ticketQuery.isFetched && ticketQuery.isSuccess && (
						<TicketCard tickets={tickets} />
					)}
				</Col>
			</Row>
		</div>
	);
}

export default NewHomePage;
