import {FETCH_USERS} from './types';

export function fetchUsers() {
	const users = fetch('https://jsonplaceholder.typicode.com/users');

	return {
		type: FETCH_USERS,
		payload: users
	};
}