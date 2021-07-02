import React from 'react';
import SignUpForm from '../../Components/SignUpForm/SignUpForm';
import LoginForm from '../../Components/LoginForm/LoginForm';
import { useState } from 'react';
import { Link } from "react-router-dom";

export default function AuthPage({ setUser }) {
	const [login, setLogin] = useState(true)

	function handleDemo(){}
	return (
		<main>
			<h3>AuthPage</h3>
			{login? (
				<p>No login credentials? <br/> 
				<button className="no-button" onClick={()=>setLogin(!login)}>Register New Account</button> &nbsp;&nbsp; | &nbsp;&nbsp; <button className="no-button" onClick={handleDemo}>Login to Demo</button>
				</p>
			):(
				<p>Have an account?<br/> 
				<button className="no-button" onClick={()=>setLogin(!login)}>Login</button> 
				</p>
			)}

			{login? <LoginForm setUser={setUser} />:<SignUpForm setUser={setUser} />}
			
		</main>
	);
}