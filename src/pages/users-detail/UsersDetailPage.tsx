import React from 'react';
import { useParams } from 'react-router-dom';

function UsersDetailPage() {
	const routeParam = useParams(); // dinamik olarak route dan gelen değerleri okumanızı sağlar.

	return <div>id:{routeParam.id}</div>;
}

export default UsersDetailPage;
