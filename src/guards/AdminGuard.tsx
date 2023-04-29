// react-router-dom paketi ile yapacağız.

type Props = {
	children: any;
};

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { LocalStorageService } from '../storage/LocalStorageService';
import { UserProfileService } from '../storage/UserProfileService';

export default function AdminGuard({ children }: Props) {
	let location = useLocation(); // ilgili sayfanın istek atılan path okumak için kullanılan bir hook.

	console.log('location', location);

	const isAuthenticated =
		LocalStorageService.getAccessToken() == null ? false : true;

	const roleExist = UserProfileService.HasRole('Admin');

	console.log('roleExist', roleExist);

	if (!isAuthenticated || !roleExist) {
		return (
			<Navigate
				to='/account/unauthorized'
				state={{ from: location }}></Navigate>
		);
	}

	return children;
}
