export interface LoginModel {
	email: string;
	password: string;
}

export interface TokenModel {
	accessToken: string;
	refreshToken: string;
}

export interface LoginResult {
	isSucceded: boolean;
	errorMessage?: string;
}

import { AxiosHeaders } from 'axios';
import HttpClient, { IHttpClient } from './httpClient';
import { LocalStorageService } from '../storage/LocalStorageService';

// apidaki hangi uçlarla haberleşeceğimiz belirledim.
export interface ILoginClient {
	login(param: LoginModel): Promise<LoginResult>;
}

// httpClient sınıfım üzerinden api isteklerini get,post,put,delete,patch yapacağım bir servis tanımladık.
export class LoginClient implements ILoginClient {
	httpClient!: HttpClient;
	private endpoint: string = 'api/tokens';

	constructor() {
		this.httpClient = new HttpClient({
			baseUrl: 'https://localhost:7044/',
			headers: new AxiosHeaders().set('Content-Type', 'application/json'),
		});
	}

	// method içerisinde async bir işlem yaptığımızdan dolayı methodu async tanımladık. try catch blogu ile fraklı tipte LoginResult return ettik.
	// Not : async tanımlanmış methodların dönüş tipi Promise olmalıdır.
	async login(param: LoginModel): Promise<LoginResult> {
		try {
			// LoginModel RequestModel
			// TokenModel ResponseModel
			// LoginResult ise arayüzden kullanılan success error durumu için tanımladığımız model
			const token = await this.httpClient.post<LoginModel, TokenModel>(
				this.endpoint,
				param
			);

			console.log('token', token);

			LocalStorageService.setAccessToken(token.accessToken);
			LocalStorageService.setRefreshToken(token.refreshToken);

			return Promise.resolve({ isSucceded: true } as LoginResult);
		} catch (error: any) {
			console.log('error', error);
			// return {
			// 	isSucceded: false,
			// 	errorMessage: error.response.data.errors, // hatalar backend error middlewareden error.response.data.errors altında geliyor
			// } as LoginResult;

			// Not hata durumlarını return ederken Promise.reject ile return edelim yok OnError methodlarına hatalar düşmez bunun yerine OnSuccess methodları tetiklenir. Buda yanlış bir kullanıma sebebiyet verir.

			return Promise.reject({
				isSucceded: false,
				errorMessage: error.response.data.errors, // hatalar backend error middlewareden error.response.data.errors altında geliyor
			} as LoginResult);
		}
	}
}
