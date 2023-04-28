import { AbilityBuilder } from '@casl/ability';

// login yada logout işlemlerinde login olan kullanıcıya ait user information bilgilerini bu function içerisine gönderip. nelere yetki verip veremedğimizi gösteririz.
export function updateAbility(ability, user) {
	const { can, cannot, rules } = new AbilityBuilder(); // yetenekleri tanımlamak için kullanılan bir sınıf.

	if (user != null) {
		if (user.role == 'Admin') {
			can('login', 'adminPanel');
			// ilk değer claimType 2. değer claimValue 3 değer bu yetkinin fieldlarını yada condiştionlarını temsil eder.
			//can('update', 'post',{published:true}); // publish edilen makaleleri update edebilirim.
		}

		const userPermissions = JSON.parse(user.permissions);

		for (const permission of userPermissions) {
			can(permission.Key, permission.Value);
		}

		can('authorized'); // kimlik doğrulanmıştır
	} else {
		can('unauthorized'); // login olmamıştır.
	}

	ability.update(rules);
}
