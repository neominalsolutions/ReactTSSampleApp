// TASK API Methorlarını yöntelim.

import { AxiosHeaders } from 'axios';
import HttpClient, { IHttpClient } from './httpClient';

// apidan döncecek olan dto tanımı
export interface Ticket {
	id: string;
	description: string;
	employeeName: string;
	workingHour: number;
	startDate: Date;
	endDate: Date;
}

// apidaki hangi uçlarla haberleşeceğimiz belirledim.
export interface ITicketClient {
	getTickets(): Promise<Ticket[]>;
	getTicketsByCustomer(id: string): Promise<Ticket[]>;
}

// httpClient sınıfım üzerinden api isteklerini get,post,put,delete,patch yapacağım bir servis tanımladık.
export class TicketClient implements ITicketClient {
	httpClient!: HttpClient;
	private endpoint: string = 'api/tickets';

	constructor() {
		this.httpClient = new HttpClient({
			baseUrl: 'https://localhost:7044/',
			headers: new AxiosHeaders().set('Content-Type', 'application/json'),
		});
	}

	getTickets(signal?: any): Promise<Ticket[]> {
		console.log('signal', signal);
		return this.httpClient.get(this.endpoint, signal);
	}
	getTicketsByCustomer(id: string): Promise<Ticket[]> {
		// api/tickets?employeeId=1
		return this.httpClient.get(`${this.endpoint}/${id}`);
	}
}
