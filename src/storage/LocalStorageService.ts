import jwt_decode from 'jwt-decode';

export class LocalStorageService {
	/**
	 * Login olduğumuzda accesstoken set edecek kodu çağıracağız.
	 * @param accessToken access token set edirlirken jwt_decoder ile decode edip ayrıca userInfo olarak local storage tutalım
	 */
	public static setAccessToken(accessToken: string) {
		const decoded = jwt_decode(accessToken);
		console.log('decoded', decoded);
		localStorage.setItem('userInfo', JSON.stringify(decoded));
		localStorage.setItem('accessToken', accessToken);
	}

	/**
	 *
	 * @param accessToken kullanıcının access token bilgisi
	 * @returns string token döndürür.
	 */
	public static setRefreshToken(accessToken: string) {
		localStorage.setItem('refreshToken', accessToken);
	}

	public static getRefreshToken(): string | null {
		const token = localStorage.getItem('refreshToken');
		return token == undefined ? null : token;
	}

	public static getAccessToken(): string | null {
		const token = localStorage.getItem('accessToken');
		return token == undefined ? null : token;
	}

	/**
	 * clear token refresh ve accesstokenları siler
	 * @returns void
	 */
	public static clearTokens(): void {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		localStorage.removeItem('userInfo');
	}

	public static getUserInfo(): any {
		if (localStorage.getItem('userInfo') != undefined) {
			return JSON.parse(localStorage.getItem('userInfo') as string); // JSON deserialize ettik.
		}

		return null;
	}

	public static getEmail(): string {
		const userInfo = this.getUserInfo();
		console.log('userInfo', userInfo);

		if (userInfo != null) {
			const email = userInfo?.email;
			return email;
		}

		return 'Guest';
	}
}
