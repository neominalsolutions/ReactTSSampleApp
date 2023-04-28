// TASK API Methorlarını yöntelim.

import { AxiosHeaders } from 'axios';
import HttpClient, { IHttpClient } from './httpClient';

// apidan döncecek olan dto tanımı
export interface Employee {
	id: string;
	fullName: string;
}

// apidaki hangi uçlarla haberleşeceğimiz belirledim.
export interface IEmployeeClient {
	getEmployees(): Promise<Employee[]>;
	getEmployeeById(id: string): Promise<Employee[]>;
}

// httpClient sınıfım üzerinden api isteklerini get,post,put,delete,patch yapacağım bir servis tanımladık.
export class EmployeeClient implements IEmployeeClient {
	httpClient!: HttpClient;
	private endpoint: string = 'api/employees';

	constructor() {
		this.httpClient = new HttpClient({
			baseUrl: 'https://localhost:7044/',
			headers: new AxiosHeaders().set('Content-Type', 'application/json'),
		});
	}
	getEmployees(): Promise<Employee[]> {
		return this.httpClient.get(this.endpoint);
	}
	getEmployeeById(id: string): Promise<Employee[]> {
		return this.httpClient.get(`${this.endpoint}/${id}`);
	}
}
