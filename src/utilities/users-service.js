import * as usersAPI from './users-api';

export async function signUp(userData) {
	try {
		// Delegate the network request code to the users-api.js API module
		// which will ultimately return a JWT
		const token = await usersAPI.signUp(userData);
		// Persist the "token"
		localStorage.setItem('token', token);
		return getUser();
	} catch {
		throw new Error('Invalid Sign Up');
	}
}

export function getToken() {
	// getItem returns null if there's no string
	const token = localStorage.getItem('token');
	if (!token) return null;
	// Check if expired, remove if it is
	const payload = JSON.parse(atob(token.split('.')[1]));
	// A JWT's exp is expressed in seconds not milliseconds, so convert
	if (payload.exp < Date.now() / 1000) {
		localStorage.removeItem('token');
		return null;
	}
	return token;
}

export function getUser() {
	const token = getToken();
	// If there is a token, reutrn the user in the payload, otherwise return null
	return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export function logOut() {
	localStorage.removeItem('token');
}

export function checkToken() {
	// Just so you don't forget how to use .then
	return usersAPI
		.checkToken()
		.then(dateStr => console.log(new Date(dateStr)));
}

export async function login(credentials) {
	try {
		// Delegate the network request code to the users-api.js API module
		// which will ultimately return a JWT
		const token = await usersAPI.login(credentials);
		// Persist the "token"
		localStorage.setItem('token', token);
		return getUser();
	} catch {
		throw new Error('Invalid Log In');
	}
}
