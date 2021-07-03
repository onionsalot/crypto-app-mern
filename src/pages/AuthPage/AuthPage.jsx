import React from 'react';
import SignUpForm from '../../Components/SignUpForm/SignUpForm';
import LoginForm from '../../Components/LoginForm/LoginForm';
import { useState } from 'react';
import * as usersService from '../../utilities/users-service';


export default function AuthPage({ setUser }) {
	const [login, setLogin] = useState(true)
	const [error, setError] = useState('');

	async function handleDemo(evt) {
		// Prevent form from being submitted to the server
		evt.preventDefault();
		try {
			// The promise returned by the signUp service method
			// will resolve to the user object included in the
			// payload of the JSON Web Token (JWT)
			const user = await usersService.login({
				email: "demo@demo",
				password: '1234567',
			});
			setUser(user);
		} catch {
			setError('Log In Failed - Try Again');
		}
	}

	return (
		<main>
			<h3>AuthPage</h3>
			{login? (
				<p>No login credentials? <br/> 
					<button className="no-button" onClick={()=>setLogin(!login)}>Register New Account</button> &nbsp;&nbsp; | &nbsp;&nbsp;<button onClick={handleDemo}>Login to Demo</button>
					<br />{error}	
				</p>
			):(
				<p>Have an account?<br/> 
					<button className="no-button" onClick={()=>setLogin(!login)}>Login</button> 
					{error}	
				</p>
			)}

			{login? <LoginForm setUser={setUser} />:<SignUpForm setUser={setUser} />}
			
		</main>
	);
}