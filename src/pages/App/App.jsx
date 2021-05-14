import { useState, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import Index from '../Index/Index';
import NavBar from '../../Components/NavBar/NavBar';
import * as coinsAPI from '../../utilities/coins-api'

import './App.css';

export default function App() {
	const [user, setUser] = useState(getUser());
	// const [coins, setCoins] = useState([]);
	const history = useHistory();

	// useEffect(() => {
	// 	history.push('/')
	// }, [history, user]);

	// useEffect(() => {
	// 	async function getCoins() {
	// 		console.log('ello mate');
	// 		const coinList = await coinsAPI.getAll();
	// 		console.log('coinList is => ',coinList)
	// 		setCoins(coinList)
	// 	}
	// 	getCoins();
	// }, []);

	return (
		<main className='App'>
			{user ? (
				<>
					<NavBar user={user} setUser={setUser} />
					<Switch>
						<Route path='/'>
							<Index />
						</Route>
						<Redirect to='/' />
					</Switch>
				</>
			) : (
				<AuthPage setUser={setUser} />
			)}
		</main>
	);
}
