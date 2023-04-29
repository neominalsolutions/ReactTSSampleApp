export class UserProfileService {
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

	public static HasRole(roleName: string): boolean {
		const userInfo = this.getUserInfo();
		console.log('userInfo', userInfo);

		if (userInfo != null) {
			return userInfo?.role.includes(roleName) ? true : false;
		}

		return false;
	}
}
