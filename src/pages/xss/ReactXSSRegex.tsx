import { useState } from 'react';

function RegexXSSDemo() {
	const users = [
		{
			id: 1,
			name: 'ali',
		},
		{
			id: 2,
			name: 'can',
		},
		{
			id: 3,
			name: 'tansu',
		},
	];

	const [filteredUsers, setFilteredUsers] = useState(users);

	const searchText = (event: any) => {
		if (event.target.value !== '') {
			const filters = filteredUsers.filter((x) =>
				new RegExp(event.target.value, 'i').test(x.name)
			);
			setFilteredUsers([...filters]);
		} else {
			setFilteredUsers([...users]);
		}
	};

	return (
		<>
			<input type="text" onChange={searchText} id="outlined-basic" />

			<ul>
				{filteredUsers.map((item: any) => {
					return <li key={item.id}>{item.name}</li>;
				})}
			</ul>
		</>
	);
}

export default RegexXSSDemo;
