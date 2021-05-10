import React from 'react';
import * as usersService from '../../utilities/users-service';

export default function OrderHistoryPage() {
	async function handleCheckToken() {
		usersService.checkToken();
	}

	return (
		<>
			<h1>OrderHistoryPage</h1>
			<button onClick={handleCheckToken}>
				Check When My Login Expires
			</button>
		</>
	);
}
