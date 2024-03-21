// react-router-dom paketi ile yapacağız.

type Props = {
	children: any;
};

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { LocalStorageService } from '../storage/LocalStorageService';

export default function AuthGuard({ children }: Props) {
	let location = useLocation(); // ilgili sayfanın istek atılan path okumak için kullanılan bir hook.

	console.log('location', location);

	// const isAuthenticated =
	// 	LocalStorageService.getAccessToken() == null ? false : true;

	// if (!isAuthenticated) {
	// 	return (
	// 		<Navigate
	// 			to='/account/new-login'
	// 			state={{ from: location }}></Navigate>
	// 	);
	// }

	return children;
}
